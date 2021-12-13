import axios from "axios";
import {
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  PAYPAL_API_URL,
} from "../config";

export const createOrder = async (req, res) => {
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "25",
        },
        description: "Mouse Logitech",
      },
    ],
    application_context: {
      brand_name: "Mauro Ecommerce",
      locale: "es-PE",
      landing_page: "NO_PREFERENCE",
      user_action: "PAY_NOW",
      return_url: "http://localhost:3000/capture-order",
      cancel_url: "http://localhost:3000/cancel-order",
    },
  };

  console.log(PAYPAL_API_CLIENT);

  const response = await axios.post(
    `${PAYPAL_API_URL}/v2/checkout/orders`,
    order,
    {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );
  console.log(response);
  console.log(response.data);

  res.send("Creating order");
};

export const captureOrder = (req, res) => {
  res.send("Capturing order");
};

export const cancelOrder = (req, res) => {
  res.send("Canceling order");
};
