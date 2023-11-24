# Mongoose Express CRUD Mastery

## Overview

A Node.js Express application built with TypeScript, integrating MongoDB using Mongoose for user data and order management. Implements data integrity with validation using Joi/Zod.

## Project Setup

- Clone the repository: `git clone <repository_url>`
- Install dependencies: `npm install`
- Set up MongoDB and configure the connection string in `.env`

## API Endpoints

| Endpoint                                | Method | Description                                         |
| --------------------------------------- | ------ | --------------------------------------------------- |
| `/api/users`                            | POST   | Create a new user                                   |
| `/api/users`                            | GET    | Retrieve a list of all users                        |
| `/api/users/:userId`                    | GET    | Retrieve a specific user by ID                      |
| `/api/users/:userId`                    | PUT    | Update user information                             |
| `/api/users/:userId`                    | DELETE | Delete a user                                       |
| `/api/users/:userId/orders`             | PUT    | Add New Product in Order                            |
| `/api/users/:userId/orders`             | GET    | Retrieve all orders for a specific user             |
| `/api/users/:userId/orders/total-price` | GET    | Calculate Total Price of Orders for a Specific User |

## Sample Responses

### Successful Response (200 OK)

```
{
  "success": true,
  "message": "User fetched successfully!",
  "data": {
    // User data
  }
}

Error Response (404 Not Found)
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}

```

## User data format

```
{
    "success": true,
    "message": "User fetched successfully!",
    "data": {
        "userId": "number",
        "username": "string",
        "fullName": {
            "firstName": "string",
            "lastName": "string"
        },
        "age": "number",
        "email": "string",
        "isActive": "boolean",
        "hobbies": [
            "string",
            "string"
        ],
        "address": {
            "street": "string",
            "city": "string",
            "country": "string"
        }
    }
}

```

## Product Data Format

```
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}

```

## Validation and Error Handling

- Implemented validation using Joi/Zod for user and order creation and updating operations.
- Handles validation errors gracefully and provides meaningful error messages in the API responses.

## Running the Application

- Run in development mode: npm run dev
- Build for production: npm run build and start the server: npm start

## Submission Details

- GitHub Repository: Repository Link
- Live Deployment: Live Link

## Coding Standards

-Followed clean, modular, and well-organized coding practices.

- Ensured proper commenting for complex logic or code sections.
- Adhered to specified API endpoint structure and naming conventions.
- Handled validation errors and implemented error handling for scenarios like user not found.

## Credits

This project was completed by MD Mahiuddin Tuhin for Apollo Level 2 Web Dev (Batch 2).
