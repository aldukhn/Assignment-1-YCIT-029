import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export function generateToken(userId) {
  var payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
  };

  let key = jwt.sign(payload, SECRET_KEY);
  let decoded = jwt.decode(key);
  console.log("Token will expire at: ", new Date(decoded.exp * 1000));

  return key;
}
