# FramerConnect Project Instructions

## Project Identity

- The project name is FramerConnect.
- Do not use KisaanConnect as the visible project name.
- FramerConnect is a farmer-to-consumer marketplace.
- Preserve the existing business purpose and user flows.

## Technology

- Frontend: HTML, CSS, Vanilla JavaScript.
- Backend: Python Flask.
- Database: SQLite.
- Use REST-style API endpoints for frontend-backend communication.
- Do not introduce unnecessary frameworks or libraries.

## Project Structure

- Keep frontend and backend separate.
- Keep HTML, CSS, and JavaScript organized.
- Keep backend logic in the backend directory.
- Keep uploaded product images in the uploads directory.
- Do not unnecessarily move existing files.

## Coding Standards

- Use clear and descriptive variable and function names.
- Prefer small functions with a single responsibility.
- Avoid duplicated logic.
- Avoid unnecessary complexity.
- Add comments only where they explain non-obvious behavior.
- Preserve existing working functionality when modifying the project.

## Authentication

- Validate required registration fields.
- Phone numbers must contain exactly 10 digits.
- Store user information in SQLite.
- Maintain the user's role as farmer or consumer.
- Do not expose passwords or sensitive information in the UI.

## Farmer Features

- Farmers must be able to add products.
- Validate product name, category, quantity, price, and location.
- Support product image uploads.
- Allow farmers to view their products.
- Allow farmers to update stock.
- Allow farmers to delete products.
- Display OUT OF STOCK when quantity is zero.
- Allow farmers to provide a UPI ID.
- Allow farmers to view consumer orders.
- Allow farmers to update order status.

## Consumer Features

- Consumers must be able to browse available products.
- Consumers must be able to search products.
- Consumers must be able to view product details.
- Consumers must be able to add products to the cart.
- Consumers must be able to remove products from the cart.
- Validate requested quantity against available stock.
- Calculate totals correctly.
- Allow consumers to provide delivery location.
- Allow consumers to select a payment method.
- Allow consumers to view their orders.

## Inventory

- Never allow stock to become negative.
- Never allow a consumer to order more than available stock.
- Reduce stock only after a successful order.
- Show OUT OF STOCK when quantity reaches zero.
- Keep stock values synchronized between the database and UI.

## Orders

- Store orders in SQLite.
- Store consumer, product, quantity, total price, delivery location,
  payment information, and order status.
- Use a clear order-status flow.
- Recalculate totals from trusted values rather than relying only on
  client-provided totals.

## Location

- Support manual location entry.
- Support browser GPS location.
- Handle denied location permission gracefully.
- Do not make GPS mandatory when manual location is available.

## User Interface

- Keep the interface simple and responsive.
- Use clear buttons and labels.
- Use in-app messages instead of unnecessary browser alerts.
- Do not use color alone to communicate important information.
- Provide useful empty states.
- Make forms easy to understand.
- Maintain keyboard accessibility where possible.

## Language Support

- Support English, Telugu, and Hindi.
- Language switching should update the complete interface.
- Do not translate only isolated labels if the rest of the page remains
  unchanged.

## Error Handling

- Validate input before sending data to the backend.
- Validate important data again on the backend.
- Handle failed API requests gracefully.
- Do not allow malformed data to crash the application.
- Show useful error messages to the user.

## Security

- Do not trust user-provided totals or stock values.
- Validate uploaded files.
- Do not use unsafe HTML injection for user-entered content.
- Do not expose unnecessary database information.
- Do not store secrets directly in frontend JavaScript.

## Working Practices

- Inspect existing files before modifying them.
- Explain the implementation plan before making broad changes.
- Make the smallest appropriate change.
- Preserve existing working behavior.
- Do not rewrite the whole project unnecessarily.
- Test the main user flow after making changes.
- Do not claim a test passed unless it was actually performed.
- Summarize changes and mention anything that still needs verification.

## Testing

Before declaring the project complete, test:

1. Farmer registration.
2. Consumer registration.
3. Login.
4. Add product.
5. Upload product image.
6. View products.
7. Update stock.
8. Delete product.
9. OUT OF STOCK behavior.
10. Search.
11. Product details.
12. Add to cart.
13. Remove from cart.
14. Correct quantity calculation.
15. Checkout.
16. Order creation.
17. Stock reduction.
18. Order status.
19. GPS/manual location.
20. Language switching.
21. Refresh and data persistence.
22. Responsive layout.