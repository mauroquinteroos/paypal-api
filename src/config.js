import dotenv from "dotenv";

dotenv.config();

export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API_URL = process.env.PAYPAL_API_URL;
export const PORT = 3000;
