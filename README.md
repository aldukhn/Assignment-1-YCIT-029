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

To get started, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/aldukhn/Assignment-YCIT-029
   ```

2. Change to the project directory:

   ```bash
   cd Assignment-YCIT-029/
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project and 
   ```bash
   copy .env.example .env 
    ```
    
5. add your `SECRET_KEY` (a secret key for JWT signing and verification):

   ```bash
   SECRET_KEY=your-secret-key
   ```

6. Start the server:

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

The `authorize` function is used as a middleware to protect API routes based on user permissions. It checks if the user making the request has the required permission to access the route. If the user has the required permission, they are allowed to access the route. Otherwise, they receive a 403 Forbidden status code.

The Authorization Middleware is an essential component of this API, responsible for protecting routes and ensuring that only users with the correct permissions can access certain resources. It helps maintain the integrity of the application and enforces a proper separation of concerns.



### How it works

The authorization middleware is implemented using a higher-order function named `authorize`. It accepts a `permission` argument and returns a middleware function. The returned middleware function is then used to protect the desired route.

The `permission` argument represents the required permission for a user to access the route. It can be one of the following strings: `"admin"`, `"read"`, `"write"`, or `"delete"`.

The middleware function works as follows:

1. Extract the JWT from the `Authorization` header of the incoming request.
2. Verify the JWT using the secret key and extract the payload.
3. Find the user in the database using the `userId` from the payload.
4. Check if the user has the required permission by searching for it in the user's permissions array.
5. If the user has the required permission, add the user object to the request (`req.user`) and call `next()` to continue processing the request.
6. If the user does not have the required permission or any other checks fail, return an appropriate error response.

## Photo Upload Middleware

Below is a breakdown of the middleware function:

1. **Import multer**: The multer package is imported.

```javascript
import multer from "multer";
```

2. **Define storage configuration**: A `multer.diskStorage` object is defined, which tells multer where to store the uploaded files and how to name them.

```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
```

- `destination`: The destination function determines the folder in which the uploaded files will be stored. In this case, it is set to the "uploads/" folder.

- `filename`: The filename function generates a unique name for each uploaded file. This is done by appending the current timestamp (Date.now()) to the original filename, separated by a hyphen. This naming scheme ensures that each file has a unique name, thus avoiding conflicts with existing files.

3. **Export multer configuration**: The multer middleware is configured with the defined storage settings and then exported for use in the application.

```javascript
export const upload = multer({ storage: storage });
```

## Generating Tokens

The `generateToken` function in `generateToken.js` is used to generate JWTs for users. You can generate a token for a user by providing their user ID as an argument:

```javascript
import { generateToken } from "./generateToken.js";

const token = generateToken(userId);
```

## insomnia Screenshots

### Screenshots (GET, POST, DELETE, PUT)

![Alt text](/SCREENSHOTS/posts/1.jpg?raw=true "Insomnia ")
![Alt text](/SCREENSHOTS/posts/2.jpg?raw=true "Insomnia ")
![Alt text](/SCREENSHOTS/posts/3.jpg?raw=true "Insomnia ")
![Alt text](/SCREENSHOTS/posts/4.jpg?raw=true "Insomnia ")

### Screenshot of File upload (photo)

![Alt text](/SCREENSHOTS/upload_photo.jpg?raw=true "Insomnia ")
