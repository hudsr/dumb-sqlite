# Dumb SQLite

Dumb SQLite is a simple Node.js application that uses SQLite as its database. It provides APIs to manage users and their purchases, with Swagger documentation for easy API exploration.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/dumb-sqlite.git
    cd dumb-sqlite
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. For development with auto-reloading:
    ```sh
    npm run dev
    ```

3. The server will start on `http://localhost:3000`.

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs` once the server is running. It uses Swagger UI to provide an interactive interface for exploring the API endpoints.

## Project Structure
- `db.js`: Initializes the SQLite database and creates the necessary tables.
- `server.js`: Sets up the Express server and Swagger documentation.
- `routes/`: Contains the route handlers for users and purchases.

## Dependencies

- [express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [sqlite3](https://www.npmjs.com/package/sqlite3): SQLite database library.
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc): Generates Swagger definitions from JSDoc comments.
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): Serves Swagger UI for API documentation.
- [nodemon](https://www.npmjs.com/package/nodemon) (dev dependency): Automatically restarts the server on file changes.

## License

This project is licensed under the ISC License.