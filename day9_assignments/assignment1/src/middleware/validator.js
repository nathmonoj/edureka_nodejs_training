
import emailValidator from 'email-validator'
import jwt from "jsonwebtoken";
import { APIError } from '../middleware/response_formatter.js'
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

export async function UpdateBodyValidator(req, res, next) {
  try {
    const { fname, lname, email, password } = req.body;
    console.log(req.body.passwor)
    console.log(!password)
    console.log(password === '')
    console.log(req.body.password && (password == ''))
    if ((fname !== undefined) && !fname) {
      new APIError(res, { error: "INCORRECT_USER_DETAILS" }, 'First Name cannot be empty.').json();
    }
    else if ((lname !== undefined) && !lname) {
      new APIError(res, { error: "INCORRECT_USER_DETAILS" }, 'Last Name cannot be empty.').json();
    }
    else if ((password !== undefined) && !password) {
      new APIError(res, { error: "INCORRECT_USER_DETAILS" }, 'Password cannot be empty.').json();
    }
    else {
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