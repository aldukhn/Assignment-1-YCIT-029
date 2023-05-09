# API Node JS and EXPRESS js

This repository contains a simple Node.js API with authorization middleware. The application is built using Express.js, JWT (JSON Web Tokens) for authentication, and lowdb as a simple JSON-based database for storing data.


## LINKS

- [**Technologies Used**](#technologies-used)
- [**Getting Started**](#getting-started)
- [**API Endpoints**](#api-endpoints)
- [**Authorization Middleware**](#authorization-middleware)
- [**Photo Upload Middleware**](#photo-upload-middleware)
- [**Generating Tokens**](#generating-tokens)
- [**insomnia Screenshots**](#insomnia-screenshots)


## Technologies Used

- [Node.js](https://github.com/nodejs/node)
- [Express.js](https://github.com/expressjs/express)
- [JSON Web Tokens (JWT)](https://github.com/auth0/node-jsonwebtoken)
- [lowdb](https://github.com/typicode/lowdb)
- [dotenv](https://github.com/motdotla/dotenv)
- [Chalk](https://github.com/chalk/chalk)
- [multer](https://github.com/expressjs/multer)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory of the project and copy the contents of `.env.example` to it.

3. In the `.env` file, set the SECRET_KEY environment variable to a secret key of your choice.

4. Start the server:

   ```bash
   npm run dev
   ```

   The server will be running at `http://localhost:3000`.

## API Endpoints

The API contains the following endpoints:

- `/api/authors` (GET, POST, PUT, DELETE)
- `/api/categories` (GET, POST, PUT, DELETE)
- `/api/comments` (GET, POST, PUT, DELETE)
- `/api/posts` (GET, POST, PUT, DELETE)
- `/api/users` (GET, POST(PHOTO UPLOAD), PUT, DELETE)

## Authorization Middleware

The `authorize` middleware is used to protect API routes based on user permissions. It checks if the user making the request has the required permission to access the route. If the user has the required permission, they are allowed to access the route. Otherwise, they receive a 403 Forbidden status code.


## Photo Upload Middleware

The `upload` middleware is used to upload `files` to the server. It accepts a file object as an argument and stores the file in the uploads/ directory. The file is given a unique name based on the current timestamp.


## Generating Tokens

The `generateToken` function is used to generate JWTs for users. You can generate a token for a user by providing their user ID as an argument.

## Conclusion

This repository contains a simple Node.js API with `authorization` middleware. The application is built using `Express.js`, `JWT` (JSON Web Tokens) for authentication, and `lowdb` as a simple JSON-based database for storing data.


## insomnia Screenshots

### Screenshots (GET, POST, DELETE, PUT)

![Alt text](/SCREENSHOTS/posts/1.jpg?raw=true "Insomnia ")
![Alt text](/SCREENSHOTS/posts/2.jpg?raw=true "Insomnia ")
![Alt text](/SCREENSHOTS/posts/3.jpg?raw=true "Insomnia ")
![Alt text](/SCREENSHOTS/posts/4.jpg?raw=true "Insomnia ")

### Screenshot of File upload (photo)

![Alt text](/SCREENSHOTS/upload_photo.jpg?raw=true "Insomnia ")
