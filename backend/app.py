import hashlib
import math
import os
import re
import secrets
import sqlite3
import uuid
from datetime import datetime, timedelta, timezone
from functools import wraps
from pathlib import Path

from flask import Flask, g, jsonify, request, send_from_directory
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename


PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_ROOT = PROJECT_ROOT / "frontend"
DATABASE_PATH = Path(__file__).resolve().parent / "framerconnect.db"
UPLOAD_FOLDER = PROJECT_ROOT / "uploads"
PRODUCT_CATEGORIES = {"Vegetables", "Fruits", "Grains", "Pulses", "Spices", "Other"}
ALLOWED_IMAGE_TYPES = {
    ".jpg": "jpeg",
    ".jpeg": "jpeg",
    ".png": "png",
    ".gif": "gif",
    ".webp": "webp",
}
MAX_IMAGE_SIZE = 5 * 1024 * 1024
ORDER_TRANSITIONS = {
    "Pending": {"Accepted", "Cancelled"},
    "Accepted": {"Preparing", "Cancelled"},
    "Preparing": {"Ready for pickup", "Cancelled"},
    "Ready for pickup": {"Completed", "Cancelled"},
    "Completed": set(),
    "Cancelled": set(),
}
PAGE_NAMES = {
    "index.html",
    "register.html",
    "farmer_dashboard.html",
    "consumer_dashboard.html",
    "addd_product.html",
    "product.html",
    "cart.html",
    "checkout.html",
    "orders.html",
}


def utc_now():
    return datetime.now(timezone.utc).isoformat()


def connect_database(database_path):
    connection = sqlite3.connect(database_path, timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def initialize_database(database_path):
    Path(database_path).parent.mkdir(parents=True, exist_ok=True)
    connection = connect_database(database_path)
    try:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL CHECK (role IN ('farmer', 'consumer')),
                location TEXT NOT NULL DEFAULT '',
                upi_id TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS auth_sessions (
                token_hash TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                expires_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                farmer_id INTEGER NOT NULL REFERENCES users(id),
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                quantity INTEGER NOT NULL CHECK (quantity >= 0),
                price REAL NOT NULL CHECK (price >= 0),
                location TEXT NOT NULL,
                description TEXT NOT NULL DEFAULT '',
                image_filename TEXT NOT NULL DEFAULT '',
                created_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_group_id TEXT NOT NULL,
                consumer_id INTEGER NOT NULL REFERENCES users(id),
                farmer_id INTEGER NOT NULL REFERENCES users(id),
                product_id INTEGER NOT NULL REFERENCES products(id),
                quantity INTEGER NOT NULL CHECK (quantity > 0),
                unit_price REAL NOT NULL CHECK (unit_price >= 0),
                total_price REAL NOT NULL CHECK (total_price >= 0),
                delivery_location TEXT NOT NULL,
                payment_method TEXT NOT NULL,
                payment_details TEXT NOT NULL DEFAULT '',
                status TEXT NOT NULL DEFAULT 'Pending',
                created_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS products_farmer_id_idx ON products(farmer_id);
            CREATE INDEX IF NOT EXISTS orders_consumer_id_idx ON orders(consumer_id);
            CREATE INDEX IF NOT EXISTS orders_farmer_id_idx ON orders(farmer_id);
            CREATE INDEX IF NOT EXISTS orders_group_id_idx ON orders(order_group_id);
            """
        )
    finally:
        connection.close()


def create_app(database_path=None, upload_folder=None):
    app = Flask(__name__, static_folder=None)
    app.config["DATABASE_PATH"] = Path(
        database_path or os.environ.get("FRAMERCONNECT_DATABASE", DATABASE_PATH)
    )
    app.config["UPLOAD_FOLDER"] = Path(
        upload_folder or os.environ.get("FRAMERCONNECT_UPLOADS", UPLOAD_FOLDER)
    )
    app.config["MAX_CONTENT_LENGTH"] = MAX_IMAGE_SIZE + 64 * 1024
    app.config["UPLOAD_FOLDER"].mkdir(parents=True, exist_ok=True)
    initialize_database(app.config["DATABASE_PATH"])

    def get_database():
        if "database" not in g:
            g.database = connect_database(app.config["DATABASE_PATH"])
        return g.database

    @app.teardown_appcontext
    def close_database(_error=None):
        database = g.pop("database", None)
        if database is not None:
            database.close()

    def json_error(message, status):
        return jsonify({"error": message}), status

    def request_data():
        data = request.get_json(silent=True)
        return data if isinstance(data, dict) else {}

    def public_user(user):
        return {
            "id": user["id"],
            "name": user["name"],
            "phone": user["phone"],
            "role": user["role"],
            "location": user["location"],
            "upi_id": user["upi_id"],
        }

    def login_required(view):
        @wraps(view)
        def wrapped(*args, **kwargs):
            authorization = request.headers.get("Authorization", "")
            scheme, _, token = authorization.partition(" ")
            if scheme.lower() != "bearer" or not token:
                return json_error("Please log in to continue.", 401)
            token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
            user = get_database().execute(
                """
                SELECT users.* FROM auth_sessions
                JOIN users ON users.id = auth_sessions.user_id
                WHERE auth_sessions.token_hash = ? AND auth_sessions.expires_at > ?
                """,
                (token_hash, utc_now()),
            ).fetchone()
            if user is None:
                return json_error("Your session has expired. Please log in again.", 401)
            g.user = user
            return view(*args, **kwargs)

        return wrapped

    def require_role(role):
        if g.user["role"] != role:
            return json_error("This action is not available for your account.", 403)
        return None

    def parse_integer(value, label, minimum=0):
        if isinstance(value, bool):
            raise ValueError(f"{label} must be a whole number.")
        try:
            parsed = int(value)
        except (TypeError, ValueError):
            raise ValueError(f"{label} must be a whole number.") from None
        if str(value).strip() != str(parsed) or parsed < minimum:
            raise ValueError(f"{label} must be at least {minimum}.")
        return parsed

    def product_payload(row):
        return {
            "id": row["id"],
            "farmer_id": row["farmer_id"],
            "farmer_name": row["farmer_name"],
            "farmer_upi_id": row["farmer_upi_id"],
            "name": row["name"],
            "category": row["category"],
            "quantity": row["quantity"],
            "price": row["price"],
            "location": row["location"],
            "description": row["description"],
            "image_url": f"/uploads/{row['image_filename']}" if row["image_filename"] else "",
            "stock_status": "OUT OF STOCK" if row["quantity"] == 0 else "In stock",
            "created_at": row["created_at"],
        }

    def get_product(product_id, connection=None):
        database = connection or get_database()
        return database.execute(
            """
            SELECT products.*, users.name AS farmer_name, users.upi_id AS farmer_upi_id
            FROM products JOIN users ON users.id = products.farmer_id
            WHERE products.id = ?
            """,
            (product_id,),
        ).fetchone()

    @app.errorhandler(413)
    def request_too_large(_error):
        return json_error("The uploaded image must be 5 MB or smaller.", 413)

    @app.get("/")
    @app.get("/index.html")
    def home_page():
        return send_from_directory(FRONTEND_ROOT, "index.html")

    @app.get("/<page>")
    def frontend_page(page):
        if page not in PAGE_NAMES:
            return json_error("Page not found.", 404)
        return send_from_directory(FRONTEND_ROOT, page)

    @app.get("/static/<path:filename>")
    def frontend_asset(filename):
        return send_from_directory(FRONTEND_ROOT / "static", filename)

    @app.get("/uploads/<path:filename>")
    def product_image(filename):
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "project": "FramerConnect"})

    @app.post("/api/register")
    def register():
        data = request_data()
        name_value = data.get("name", "")
        phone_value = data.get("phone", "")
        location = data.get("location", "")
        upi_id = data.get("upi_id", "")
        if not all(isinstance(value, str) for value in (name_value, phone_value, location, upi_id)):
            return json_error("Name, phone, location, and UPI ID must be text.", 400)
        name = name_value.strip()
        phone = phone_value.strip()
        password = data.get("password", "")
        role = data.get("role", "")
        location = location.strip()
        upi_id = upi_id.strip()
        if not name or len(name) > 100:
            return json_error("Enter your name (up to 100 characters).", 400)
        if not re.fullmatch(r"[0-9]{10}", phone):
            return json_error("Phone number must contain exactly 10 digits.", 400)
        if not isinstance(password, str) or len(password) < 8 or len(password) > 128:
            return json_error("Password must contain 8 to 128 characters.", 400)
        if not isinstance(role, str) or role not in {"farmer", "consumer"}:
            return json_error("Choose farmer or consumer as your account type.", 400)
        if len(location) > 250 or len(upi_id) > 100:
            return json_error("Location or UPI ID is too long.", 400)

        database = get_database()
        if database.execute("SELECT 1 FROM users WHERE phone = ?", (phone,)).fetchone():
            return json_error("An account with this phone number already exists.", 409)
        try:
            cursor = database.execute(
                """
                INSERT INTO users (name, phone, password_hash, role, location, upi_id, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (name, phone, generate_password_hash(password), role, location, upi_id, utc_now()),
            )
            database.commit()
        except sqlite3.IntegrityError:
            database.rollback()
            return json_error("An account with this phone number already exists.", 409)
        user = database.execute("SELECT * FROM users WHERE id = ?", (cursor.lastrowid,)).fetchone()
        return jsonify({"message": "Account created successfully.", "user": public_user(user)}), 201

    @app.post("/api/login")
    def login():
        data = request_data()
        phone = data.get("phone", "")
        password = data.get("password", "")
        if not isinstance(phone, str) or not phone.strip() or not isinstance(password, str):
            return json_error("Enter your phone number and password.", 400)
        phone = phone.strip()
        user = get_database().execute("SELECT * FROM users WHERE phone = ?", (phone,)).fetchone()
        if user is None or not check_password_hash(user["password_hash"], password):
            return json_error("Phone number or password is incorrect.", 401)

        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
        expires_at = (datetime.now(timezone.utc) + timedelta(days=30)).isoformat()
        get_database().execute(
            "INSERT INTO auth_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
            (token_hash, user["id"], expires_at),
        )
        get_database().commit()
        return jsonify({"token": token, "user": public_user(user)})

    @app.get("/api/me")
    @login_required
    def current_user():
        return jsonify({"user": public_user(g.user)})

    @app.post("/api/logout")
    @login_required
    def logout():
        token = request.headers["Authorization"].partition(" ")[2]
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
        get_database().execute("DELETE FROM auth_sessions WHERE token_hash = ?", (token_hash,))
        get_database().commit()
        return jsonify({"message": "You have been logged out."})

    @app.patch("/api/profile")
    @login_required
    def update_profile():
        data = request_data()
        fields = {}
        if "location" in data:
            location = data["location"]
            if not isinstance(location, str) or len(location.strip()) > 250:
                return json_error("Location must be 250 characters or fewer.", 400)
            fields["location"] = location.strip()
        if "upi_id" in data:
            upi_id = data["upi_id"]
            if not isinstance(upi_id, str) or len(upi_id.strip()) > 100:
                return json_error("UPI ID must be 100 characters or fewer.", 400)
            fields["upi_id"] = upi_id.strip()
        if not fields:
            return json_error("There are no valid profile fields to update.", 400)
        assignments = ", ".join(f"{field} = ?" for field in fields)
        get_database().execute(
            f"UPDATE users SET {assignments} WHERE id = ?",
            (*fields.values(), g.user["id"]),
        )
        get_database().commit()
        updated_user = get_database().execute(
            "SELECT * FROM users WHERE id = ?", (g.user["id"],)
        ).fetchone()
        return jsonify({"user": public_user(updated_user)})

    @app.get("/api/products")
    def list_products():
        search = request.args.get("search", "").strip()
        category = request.args.get("category", "").strip()
        clauses = []
        parameters = []
        if request.args.get("all") != "true":
            clauses.append("products.quantity > 0")
        if search:
            clauses.append("(products.name LIKE ? OR products.description LIKE ? OR products.location LIKE ?)")
            search_term = f"%{search}%"
            parameters.extend([search_term, search_term, search_term])
        if category:
            if category not in PRODUCT_CATEGORIES:
                return json_error("Choose a valid product category.", 400)
            clauses.append("products.category = ?")
            parameters.append(category)
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        rows = get_database().execute(
            f"""
            SELECT products.*, users.name AS farmer_name, users.upi_id AS farmer_upi_id
            FROM products JOIN users ON users.id = products.farmer_id
            {where}
            ORDER BY products.created_at DESC, products.id DESC
            """,
            parameters,
        ).fetchall()
        return jsonify({"products": [product_payload(row) for row in rows]})

    @app.get("/api/my/products")
    @login_required
    def list_my_products():
        role_error = require_role("farmer")
        if role_error:
            return role_error
        rows = get_database().execute(
            """
            SELECT products.*, users.name AS farmer_name, users.upi_id AS farmer_upi_id
            FROM products JOIN users ON users.id = products.farmer_id
            WHERE products.farmer_id = ?
            ORDER BY products.created_at DESC, products.id DESC
            """,
            (g.user["id"],),
        ).fetchall()
        return jsonify({"products": [product_payload(row) for row in rows]})

    @app.get("/api/products/<int:product_id>")
    def product_details(product_id):
        product = get_product(product_id)
        if product is None:
            return json_error("Product not found.", 404)
        return jsonify({"product": product_payload(product)})

    @app.post("/api/products")
    @login_required
    def create_product():
        role_error = require_role("farmer")
        if role_error:
            return role_error
        name = request.form.get("name", "").strip()
        category = request.form.get("category", "").strip()
        location = request.form.get("location", "").strip()
        description = request.form.get("description", "").strip()
        try:
            quantity = parse_integer(request.form.get("quantity"), "Quantity")
            price = float(request.form.get("price", ""))
        except ValueError as error:
            return json_error(str(error), 400)
        if not name or len(name) > 120:
            return json_error("Product name is required (up to 120 characters).", 400)
        if category not in PRODUCT_CATEGORIES:
            return json_error("Choose a valid product category.", 400)
        if not math.isfinite(price) or not 0 <= price <= 1_000_000:
            return json_error("Enter a valid price between 0 and 1,000,000.", 400)
        if not location or len(location) > 250 or len(description) > 2000:
            return json_error("Enter a location and keep the description under 2,000 characters.", 400)

        image = request.files.get("image")
        image_filename = ""
        if image and image.filename:
            extension = Path(secure_filename(image.filename)).suffix.lower()
            expected_type = ALLOWED_IMAGE_TYPES.get(extension)
            if not expected_type:
                return json_error("Upload a JPG, PNG, GIF, or WebP image.", 400)
            image.stream.seek(0, os.SEEK_END)
            image_size = image.stream.tell()
            image.stream.seek(0)
            header = image.stream.read(12)
            image.stream.seek(0)
            if image_size > MAX_IMAGE_SIZE:
                return json_error("The uploaded image must be 5 MB or smaller.", 413)
            valid_image = {
                "jpeg": header.startswith(b"\xff\xd8\xff"),
                "png": header.startswith(b"\x89PNG\r\n\x1a\n"),
                "gif": header.startswith((b"GIF87a", b"GIF89a")),
                "webp": header.startswith(b"RIFF") and header[8:12] == b"WEBP",
            }[expected_type]
            if not valid_image:
                return json_error("The uploaded file is not a valid image of that type.", 400)
            image_filename = f"{uuid.uuid4().hex}{extension}"
            image.save(app.config["UPLOAD_FOLDER"] / image_filename)

        database = get_database()
        cursor = database.execute(
            """
            INSERT INTO products
                (farmer_id, name, category, quantity, price, location, description, image_filename, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                g.user["id"], name, category, quantity, price, location, description,
                image_filename, utc_now(),
            ),
        )
        database.commit()
        product = get_product(cursor.lastrowid, database)
        return jsonify({"product": product_payload(product)}), 201

    @app.patch("/api/products/<int:product_id>")
    @login_required
    def update_product(product_id):
        role_error = require_role("farmer")
        if role_error:
            return role_error
        data = request_data()
        try:
            quantity = parse_integer(data.get("quantity"), "Quantity")
        except ValueError as error:
            return json_error(str(error), 400)
        database = get_database()
        cursor = database.execute(
            "UPDATE products SET quantity = ? WHERE id = ? AND farmer_id = ?",
            (quantity, product_id, g.user["id"]),
        )
        database.commit()
        if cursor.rowcount == 0:
            product = get_product(product_id)
            if product is None:
                return json_error("Product not found.", 404)
            return json_error("You can only update stock for your own products.", 403)
        return jsonify({"product": product_payload(get_product(product_id, database))})

    @app.delete("/api/products/<int:product_id>")
    @login_required
    def delete_product(product_id):
        role_error = require_role("farmer")
        if role_error:
            return role_error
        database = get_database()
        product = database.execute(
            "SELECT * FROM products WHERE id = ? AND farmer_id = ?",
            (product_id, g.user["id"]),
        ).fetchone()
        if product is None:
            exists = database.execute("SELECT 1 FROM products WHERE id = ?", (product_id,)).fetchone()
            return json_error(
                "You can only delete your own products." if exists else "Product not found.",
                403 if exists else 404,
            )
        database.execute("BEGIN IMMEDIATE")
        order_count = database.execute(
            "SELECT COUNT(*) FROM orders WHERE product_id = ?", (product_id,)
        ).fetchone()[0]
        if order_count:
            database.rollback()
            return json_error(
                "This product has order history. Set its stock to zero instead of deleting it.",
                409,
            )
        database.execute("DELETE FROM products WHERE id = ?", (product_id,))
        database.commit()
        warning = ""
        if product["image_filename"]:
            image_path = app.config["UPLOAD_FOLDER"] / product["image_filename"]
            try:
                image_path.unlink(missing_ok=True)
            except PermissionError:
                warning = "The product was deleted, but its image is still in use and could not be removed."
                app.logger.warning("Deleted product %s but could not remove its image file.", product_id)
        return jsonify({"message": "Product deleted.", "warning": warning})

    @app.post("/api/orders")
    @login_required
    def create_order():
        role_error = require_role("consumer")
        if role_error:
            return role_error
        data = request_data()
        items = data.get("items")
        delivery_location = data.get("delivery_location", "")
        payment_method = data.get("payment_method")
        payment_details = data.get("payment_details", "")
        if not isinstance(items, list) or not items or len(items) > 50:
            return json_error("Your cart must contain between 1 and 50 products.", 400)
        if not isinstance(delivery_location, str) or not delivery_location.strip() or len(delivery_location.strip()) > 250:
            return json_error("Enter a delivery location (up to 250 characters).", 400)
        if not isinstance(payment_method, str) or payment_method not in {"cash", "upi"}:
            return json_error("Choose cash on delivery or UPI as your payment method.", 400)
        if not isinstance(payment_details, str) or len(payment_details.strip()) > 100:
            return json_error("Payment reference must be 100 characters or fewer.", 400)
        delivery_location = delivery_location.strip()
        payment_details = payment_details.strip()

        quantities = {}
        try:
            for item in items:
                if not isinstance(item, dict):
                    raise ValueError("Cart items are invalid.")
                product_id = parse_integer(item.get("product_id"), "Product ID", 1)
                quantity = parse_integer(item.get("quantity"), "Quantity", 1)
                quantities[product_id] = quantities.get(product_id, 0) + quantity
        except ValueError as error:
            return json_error(str(error), 400)

        database = get_database()
        group_id = uuid.uuid4().hex
        created_at = utc_now()
        order_items = []
        database.execute("BEGIN IMMEDIATE")
        for product_id, quantity in quantities.items():
            product = get_product(product_id, database)
            if product is None:
                database.rollback()
                return json_error("A product in your cart is no longer available.", 404)
            if quantity > product["quantity"]:
                database.rollback()
                return json_error(
                    f"Only {product['quantity']} of {product['name']} are available.",
                    409,
                )
            total_price = round(product["price"] * quantity, 2)
            cursor = database.execute(
                """
                INSERT INTO orders
                    (order_group_id, consumer_id, farmer_id, product_id, quantity, unit_price,
                     total_price, delivery_location, payment_method, payment_details, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?)
                """,
                (
                    group_id, g.user["id"], product["farmer_id"], product_id, quantity,
                    product["price"], total_price, delivery_location, payment_method,
                    payment_details, created_at,
                ),
            )
            database.execute(
                "UPDATE products SET quantity = quantity - ? WHERE id = ?",
                (quantity, product_id),
            )
            order_items.append(
                {
                    "id": cursor.lastrowid,
                    "product_id": product_id,
                    "product_name": product["name"],
                    "quantity": quantity,
                    "unit_price": product["price"],
                    "total_price": total_price,
                    "farmer_name": product["farmer_name"],
                    "farmer_upi_id": product["farmer_upi_id"],
                }
            )
        database.commit()
        return jsonify(
            {
                "order_group_id": group_id,
                "status": "Pending",
                "payment_method": payment_method,
                "delivery_location": delivery_location,
                "total": round(sum(item["total_price"] for item in order_items), 2),
                "items": order_items,
            }
        ), 201

    @app.get("/api/orders")
    @login_required
    def list_orders():
        role_error = require_role(g.user["role"])
        if role_error:
            return role_error
        ownership_column = "orders.farmer_id" if g.user["role"] == "farmer" else "orders.consumer_id"
        rows = get_database().execute(
            f"""
            SELECT orders.*, products.name AS product_name, products.image_filename,
                   farmers.name AS farmer_name, consumers.name AS consumer_name
            FROM orders
            JOIN products ON products.id = orders.product_id
            JOIN users AS farmers ON farmers.id = orders.farmer_id
            JOIN users AS consumers ON consumers.id = orders.consumer_id
            WHERE {ownership_column} = ?
            ORDER BY orders.created_at DESC, orders.id DESC
            """,
            (g.user["id"],),
        ).fetchall()
        orders = []
        for row in rows:
            orders.append(
                {
                    "id": row["id"],
                    "order_group_id": row["order_group_id"],
                    "product_id": row["product_id"],
                    "product_name": row["product_name"],
                    "image_url": f"/uploads/{row['image_filename']}" if row["image_filename"] else "",
                    "quantity": row["quantity"],
                    "unit_price": row["unit_price"],
                    "total_price": row["total_price"],
                    "delivery_location": row["delivery_location"],
                    "payment_method": row["payment_method"],
                    "payment_details": row["payment_details"],
                    "status": row["status"],
                    "created_at": row["created_at"],
                    "farmer_name": row["farmer_name"],
                    "consumer_name": row["consumer_name"],
                }
            )
        return jsonify({"orders": orders})

    @app.patch("/api/orders/<int:order_id>")
    @login_required
    def update_order_status(order_id):
        role_error = require_role("farmer")
        if role_error:
            return role_error
        data = request_data()
        next_status = data.get("status")
        if not isinstance(next_status, str) or next_status not in ORDER_TRANSITIONS:
            return json_error("Choose a valid order status.", 400)
        database = get_database()
        database.execute("BEGIN IMMEDIATE")
        order = database.execute(
            "SELECT * FROM orders WHERE id = ? AND farmer_id = ?",
            (order_id, g.user["id"]),
        ).fetchone()
        if order is None:
            database.rollback()
            return json_error("Order not found.", 404)
        if next_status not in ORDER_TRANSITIONS[order["status"]]:
            database.rollback()
            return json_error(
                f"Order status cannot change from {order['status']} to {next_status}.",
                409,
            )
        database.execute("UPDATE orders SET status = ? WHERE id = ?", (next_status, order_id))
        if next_status == "Cancelled":
            database.execute(
                "UPDATE products SET quantity = quantity + ? WHERE id = ?",
                (order["quantity"], order["product_id"]),
            )
        database.commit()
        return jsonify({"id": order_id, "status": next_status})

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.environ.get("PORT", "5000")), debug=False)