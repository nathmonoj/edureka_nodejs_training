import jwt from "jsonwebtoken";
import { UserModel } from "../schema/schema.js";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export async function jwtTokenVerifier(jwtToken) {
  let user = {}
  const payload = await jwt.verify(jwtToken, SECRET_KEY)
  if (payload) {
    user = await UserModel.findById(payload.id, { password: 0 })
  }
  return user
}