# FramerConnect

FramerConnect is a farmer-to-consumer marketplace. Farmers list local
agricultural products, and consumers can browse, order, and track them directly.

## Features

- Separate farmer and consumer registration and login.
- Farmer dashboard for products, stock, seller location, UPI ID, and orders.
- Product categories, descriptions, local image uploads, and stock status.
- Product browsing, search, details, cart, checkout, and order history.
- Server-side price calculation and stock checks during order placement.
- Cash-on-delivery and UPI payment selection.
- Order-status updates; cancelling an order restores its reserved stock.
- Manual location entry and optional browser GPS.
- English, Telugu, and Hindi interface translations.

## Technology and storage

- Frontend: HTML, CSS, and vanilla JavaScript in `frontend/`.
- Backend: Flask REST API in `backend/app.py`.
- Database: SQLite at `backend/framerconnect.db` (created automatically).
- Product images: local files under `uploads/` (created automatically).

Passwords are stored as password hashes. Login tokens are stored in the
browser and their hashes are stored in SQLite. Use HTTPS and a production
WSGI server before exposing the app to the internet.

## Run locally

From the project root, create and activate a virtual environment, then install
the sole runtime dependency:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python backend/app.py
```

Open <http://127.0.0.1:5000>. The server binds to localhost by default. Set
`PORT` to select a different port. Browser GPS requires permission and a secure
context; localhost is considered secure by modern browsers. Manual location
entry is always available. Set `FRAMERCONNECT_DATABASE` or
`FRAMERCONNECT_UPLOADS` to use alternate storage locations.

## Tests

Run the backend API and persistence tests from the project root:

```powershell
python -m unittest backend.test_app
```

The suite uses temporary SQLite databases and upload directories.