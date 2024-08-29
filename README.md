# JWT Authentication with Express

This is a simple Express application that demonstrates how to implement JSON Web Token (JWT) authentication. The application includes the following endpoints:

- `/login`: Authenticates a user and generates a JWT.
- `/resource`: Verifies the JWT and displays a message with the username.
- `/admin_resource`: Verifies the JWT and checks if the user is an admin before granting access.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IronMike4/jwtAuthentication.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd jwtAuthentication
   ```

3. **Install the necessary dependencies:**

   ```bash
   npm install
   ```

## Running the Application

1. **Start the server:**

   ```bash
   node index.js
   ```

   Alternatively, you can use nodemon for automatic restarts:

   ```bash
   nodemon index.js
   ```

2. **The server will run on http://localhost:8000.**

### API Endpoints

1. **POST /login**

   - **Description**: Authenticates the user and returns a JWT.
   - **Body**:
     ```json
     {
       "username": "zama",
       "password": "abcdef"
     }
     ```
   - **Response**:
     - Success: `{ "token": "<JWT>" }`
     - Error: `{ "err": "Incorrect login!" }`

2. **GET /resource**

   - **Description**: Verifies the JWT and returns a message with the username.
   - **Headers**: `Authorization: Bearer <JWT>`
   - **Response**:
     - Success: `{ "msg": "Hello, <username>! Your JWT is valid." }`
     - Error: `{ "err": "Invalid JWT!" }`

3. **GET /admin_resource**
   - **Description**: Verifies the JWT and checks if the user is an admin.
   - **Headers**: `Authorization: Bearer <JWT>`
   - **Response**:
     - Success: `{ "msg": "Success!" }`
     - Error:
       - `{ "msg": "Not an admin." }`
       - `{ "err": "Invalid JWT!" }`

## Contact

[Michael Mahachi](mikhach@gmail.com)

## References

HyperionDev Authentication with JWT Task(PDF)
