import axios from "axios";
import { PAYPAL_API_URL } from "../config";
import { generateToken } from "../services/token";

export const createOrder = async (req, res) => {
  try {
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

    const token = await generateToken();

    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const captureOrder = (req, res) => {
  res.send("Capturing order");
};

export const cancelOrder = (req, res) => {
  res.send("Canceling order");
};
