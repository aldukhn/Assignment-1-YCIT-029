import db from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../generateToken.js";
import chalk from "chalk";
console.log(
  `THE SECRET KEY OF 1 (ADMIN) user is:  ${chalk.green(generateToken(1))}`
);
console.log(
  `THE SECRET KEY OF 2 (MANAGER) user is:  ${chalk.yellow(generateToken(2))}`
);

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export function authorize(permission) {
  if (
    !permission ||
    typeof permission !== "string" ||
    !["admin", "read", "write", "delete"].includes(permission)
  ) {
    throw new Error("Invalid permission argument" + permission);
  }

  return (req, res, next) => {
    // Get JWT from the header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // header format is 'BASIC <JWT>'

    // Verify the JWT and get the payload
    let payload;
    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = db.data.users.find((u) => u.id === payload.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const hasPermission =
      user.permissions && user.permissions.includes(permission);

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;

    next();
  };
}
