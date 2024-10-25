# Vaposhop-Ecommerce

In this self-imposed challenge, I'll harness the power of AI to accelerate the development of a professional, full-stack e-commerce platform for vaping enthusiasts. The platform will offer a curated selection of high-quality e-liquids, vaporizers, and accessories. While leveraging AI to streamline the process, I'm committed to delivering a robust production ready and user-friendly online store that meets the highest industry standards.

## Deployment, Workflows and CI/CD

This project is structured as a MERN stack application with a single GitHub repository containing both the backend and frontend. The backend is located in the `server` directory, while the frontend is housed in the `client` directory. Both services are fully dockerized to ensure consistency across different environments.

To automate the deployment process, we have set up a Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions. Upon every push to the `main` branch, the following steps are executed:

1. **Docker Build**: Both the backend and frontend services are built using Docker, ensuring that all dependencies are managed and that the application runs smoothly in containerized environments.

2. **Backend Deployment**: The backend service is redeployed automatically to Render using the Render API. The deployment is triggered by a `curl` command that sends a POST request to the Render API with the service ID for the backend.

3. **Frontend Deployment**: Similarly, the frontend service is redeployed to Render. Another `curl` command triggers the deployment of the React application using the frontend service ID.

This setup ensures that the application is consistently up-to-date, containerized, and that changes are reflected in both the backend and frontend services seamlessly.

## Features (first iteration)

### User Authentication:

-   Registration, login, and password reset.
-   Passport.js for authentication with email/password.
-   Google OAuth for login/registration with a Google account.

### Product Catalog:

-   Product details with descriptions, categories, and search functionality.

### Shopping Cart:

-   Ability to add/remove items and adjust quantities.

### Checkout and Payment Processing:

-   Integration with a payment gateway (e.g., Stripe, PayPal) to handle payments.

### Order Management:

-   Track orders and view order history for customers.

### Admin Dashboard:

-   CRUD operations for managing products, users, and orders.
-   Step 2: Define Technology Stack

## Frontend stack

-   React with Redux Toolkit and RTK Query for state management and API calls.
-   Tailwind CSS for styling.

## Backend stack

-   Node and Express for handling API routes and logic.
-   Passport.js with Google OAuth and Local Strategy (email/password).
-   MongoDB with Mongoose for database management.
