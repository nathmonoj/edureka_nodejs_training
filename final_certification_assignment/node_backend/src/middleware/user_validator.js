
import emailValidator from 'email-validator'
import jwt from "jsonwebtoken";
import { APIError } from './response_formatter.js'
import { jwtTokenVerifier } from "../utils/helper.js";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

async function isEmailValid(email) {
  return emailValidator.validate(email)
}

export async function RegBodyValidator(req, res, next) {
  try {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
      new APIError(res, { error: "INCORRECT_USER_DETAILS" }, 'First Name/Last Name/Email/Password missing.').json();
    } else {
      const isValidatEmail = await isEmailValid(email);
      if (!isValidatEmail) {
        new APIError(res, { error: 'INVALID_EMAIL' }, 'Please provide a valid email address.', 400).json();
      }
      else {
        next();
        return;
      }
    }
  }
  catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json();
  }

}

export async function LoginBodyValidator(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      new APIError(res, { error: "INCORRECT_USER_DETAILS" }, 'Email/Password missing.').json();
    } else {
      const isValidatEmail = await isEmailValid(email);
      if (!isValidatEmail) {
        new APIError(res, { error: 'INVALID_EMAIL' }, 'Please provide a valid email address.', 400).json();
      }
      else {
        next();
        return;
      }
    }
  }
  catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json();
  }

}