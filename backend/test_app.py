import importlib
import io
import os
import tempfile
import unittest
from pathlib import Path

_TEST_BOOTSTRAP_DIRECTORY = tempfile.TemporaryDirectory(prefix="framerconnect-test-bootstrap-")
_TEST_BOOTSTRAP_ROOT = Path(_TEST_BOOTSTRAP_DIRECTORY.name)
os.environ["FRAMERCONNECT_DATABASE"] = str(_TEST_BOOTSTRAP_ROOT / "bootstrap.sqlite3")
os.environ["FRAMERCONNECT_UPLOADS"] = str(_TEST_BOOTSTRAP_ROOT / "uploads")

create_app = importlib.import_module("backend.app").create_app


class MarketplaceApiTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        root = Path(self.temporary_directory.name)
        self.app = create_app(root / "test.sqlite3", root / "uploads")
        self.app.config["TESTING"] = True
        self.client = self.app.test_client()
        self.farmer = self.create_account(
            "Farmer One", "9876543210", "farmer-password", "farmer",
            location="Green Valley", upi_id="farmer@bank",
        )
        self.consumer = self.create_account(
            "Consumer One", "9123456780", "consumer-password", "consumer",
            location="Town Center",
        )

    def tearDown(self):
        self.temporary_directory.cleanup()

    def headers(self, account):
        return {"Authorization": f"Bearer {account['token']}"}

    def create_account(self, name, phone, password, role, **extra):
        response = self.client.post(
            "/api/register",
            json={
                "name": name, "phone": phone, "password": password,
                "role": role, **extra,
            },
        )
        self.assertEqual(response.status_code, 201, response.get_json())
        login = self.client.post("/api/login", json={"phone": phone, "password": password})
        self.assertEqual(login.status_code, 200, login.get_json())
        return login.get_json()

    def create_product(self, name="Tomatoes", quantity=5, price="15.50"):
        return self.client.post(
            "/api/products",
            data={
                "name": name,
                "category": "Vegetables",
                "quantity": str(quantity),
                "price": price,
                "location": "Green Valley",
                "description": "Fresh seasonal tomatoes.",
                "image": (io.BytesIO(b"\x89PNG\r\n\x1a\n" + b"\x00" * 16), f"{name}.png"),
            },
            headers=self.headers(self.farmer),
            content_type="multipart/form-data",
        )

    def test_registration_validation_login_and_session(self):
        invalid_phone = self.client.post(
            "/api/register",
            json={"name": "Invalid", "phone": "123", "password": "password123", "role": "farmer"},
        )
        self.assertEqual(invalid_phone.status_code, 400)
        duplicate_phone = self.client.post(
            "/api/register",
            json={"name": "Duplicate", "phone": "9876543210", "password": "password123", "role": "farmer"},
        )
        self.assertEqual(duplicate_phone.status_code, 409)
        wrong_password = self.client.post(
            "/api/login", json={"phone": "9876543210", "password": "wrong"}
        )
        self.assertEqual(wrong_password.status_code, 401)
        current = self.client.get("/api/me", headers=self.headers(self.farmer))
        self.assertEqual(current.get_json()["user"]["role"], "farmer")
        self.assertNotIn("password_hash", current.get_json()["user"])
        page = self.client.get("/farmer_dashboard.html")
        self.assertEqual(page.status_code, 200)
        page.close()

    def test_product_upload_browse_search_stock_and_delete(self):
        response = self.create_product()
        self.assertEqual(response.status_code, 201, response.get_json())
        product = response.get_json()["product"]
        self.assertTrue(product["image_url"].startswith("/uploads/"))
        uploaded = self.client.get(product["image_url"])
        self.assertEqual(uploaded.status_code, 200)
        self.assertTrue(uploaded.data.startswith(b"\x89PNG"))
        uploaded.close()

        searched = self.client.get("/api/products?search=tomato")
        self.assertEqual([item["id"] for item in searched.get_json()["products"]], [product["id"]])
        detail = self.client.get(f"/api/products/{product['id']}")
        self.assertEqual(detail.get_json()["product"]["farmer_upi_id"], "farmer@bank")

        updated = self.client.patch(
            f"/api/products/{product['id']}",
            json={"quantity": 0},
            headers=self.headers(self.farmer),
        )
        self.assertEqual(updated.get_json()["product"]["stock_status"], "OUT OF STOCK")
        self.assertEqual(self.client.get("/api/products").get_json()["products"], [])
        self.assertEqual(
            self.client.patch(
                f"/api/products/{product['id']}",
                json={"quantity": -1},
                headers=self.headers(self.farmer),
            ).status_code,
            400,
        )
        deleted = self.client.delete(
            f"/api/products/{product['id']}", headers=self.headers(self.farmer)
        )
        self.assertEqual(deleted.status_code, 200)
        self.assertFalse(Path(self.app.config["UPLOAD_FOLDER"], Path(product["image_url"]).name).exists())

    def test_checkout_recalculates_total_and_updates_stock_atomically(self):
        product = self.create_product(quantity=5, price="15.50").get_json()["product"]
        additional = self.client.post(
            "/api/products",
            data={
                "name": "Carrots", "category": "Vegetables", "quantity": "1",
                "price": "10", "location": "Green Valley",
            },
            headers=self.headers(self.farmer),
        ).get_json()["product"]
        rejected = self.client.post(
            "/api/orders",
            json={
                "items": [{"product_id": product["id"], "quantity": 2},
                          {"product_id": additional["id"], "quantity": 2}],
                "delivery_location": "Town Center",
                "payment_method": "cash",
            },
            headers=self.headers(self.consumer),
        )
        self.assertEqual(rejected.status_code, 409)
        self.assertEqual(
            self.client.get(f"/api/products/{product['id']}").get_json()["product"]["quantity"],
            5,
        )
        self.assertEqual(
            self.client.get("/api/orders", headers=self.headers(self.consumer)).get_json()["orders"],
            [],
        )

        placed = self.client.post(
            "/api/orders",
            json={
                "items": [{"product_id": product["id"], "quantity": 2, "total": 0}],
                "delivery_location": "Town Center",
                "payment_method": "upi",
                "payment_details": "UPI-REF-123",
                "total": 1,
            },
            headers=self.headers(self.consumer),
        )
        self.assertEqual(placed.status_code, 201, placed.get_json())
        order = placed.get_json()
        self.assertEqual(order["total"], 31)
        self.assertEqual(order["items"][0]["total_price"], 31)
        self.assertEqual(
            self.client.get(f"/api/products/{product['id']}").get_json()["product"]["quantity"],
            3,
        )
        consumer_orders = self.client.get(
            "/api/orders", headers=self.headers(self.consumer)
        ).get_json()["orders"]
        self.assertEqual(consumer_orders[0]["payment_details"], "UPI-REF-123")

        farmer_orders = self.client.get("/api/orders", headers=self.headers(self.farmer))
        order_id = farmer_orders.get_json()["orders"][0]["id"]
        accepted = self.client.patch(
            f"/api/orders/{order_id}", json={"status": "Accepted"},
            headers=self.headers(self.farmer),
        )
        self.assertEqual(accepted.get_json()["status"], "Accepted")
        invalid_transition = self.client.patch(
            f"/api/orders/{order_id}", json={"status": "Completed"},
            headers=self.headers(self.farmer),
        )
        self.assertEqual(invalid_transition.status_code, 409)
        cancelled = self.client.patch(
            f"/api/orders/{order_id}", json={"status": "Cancelled"},
            headers=self.headers(self.farmer),
        )
        self.assertEqual(cancelled.status_code, 200)
        self.assertEqual(
            self.client.get(f"/api/products/{product['id']}").get_json()["product"]["quantity"],
            5,
        )

    def test_roles_profile_and_ordered_products_cannot_be_deleted(self):
        product = self.create_product().get_json()["product"]
        consumer_cannot_update = self.client.patch(
            f"/api/products/{product['id']}", json={"quantity": 0},
            headers=self.headers(self.consumer),
        )
        self.assertEqual(consumer_cannot_update.status_code, 403)
        profile = self.client.patch(
            "/api/profile", json={"upi_id": "new@bank", "location": "New farm"},
            headers=self.headers(self.farmer),
        )
        self.assertEqual(profile.get_json()["user"]["upi_id"], "new@bank")
        order = self.client.post(
            "/api/orders",
            json={
                "items": [{"product_id": product["id"], "quantity": 1}],
                "delivery_location": "Town Center", "payment_method": "cash",
            },
            headers=self.headers(self.consumer),
        )
        self.assertEqual(order.status_code, 201)
        protected_delete = self.client.delete(
            f"/api/products/{product['id']}", headers=self.headers(self.farmer)
        )
        self.assertEqual(protected_delete.status_code, 409)
        self.assertEqual(
            self.client.get("/api/health").get_json(),
            {"status": "ok", "project": "FramerConnect"},
        )

    def test_frontend_pages_assets_and_branding_are_served(self):
        pages = (
            "index.html", "register.html", "farmer_dashboard.html",
            "consumer_dashboard.html", "addd_product.html", "product.html",
            "cart.html", "checkout.html", "orders.html",
        )
        for page_name in pages:
            with self.subTest(page=page_name):
                response = self.client.get(f"/{page_name}")
                self.assertEqual(response.status_code, 200)
                self.assertIn(b"FramerConnect", response.data)
                response.close()
        script = self.client.get("/static/script.js")
        self.assertEqual(script.status_code, 200)
        self.assertIn(b"FramerConnect", script.data)
        self.assertIn("తెలుగు".encode("utf-8"), script.data)
        self.assertIn("हिन्दी".encode("utf-8"), script.data)
        script.close()
        stylesheet = self.client.get("/static/style.css")
        self.assertEqual(stylesheet.status_code, 200)
        stylesheet.close()


if __name__ == "__main__":
    unittest.main()
