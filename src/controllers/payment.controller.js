import axios from "axios";
import { HOST, PAYPAL_API_URL } from "../config";
import { generateToken } from "../services/token";

export const createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "10",
          },
          description: "Mouse Logitech",
        },
      ],
      application_context: {
        brand_name: "Mauro Ecommerce",
        locale: "es-PE",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${HOST}/capture-order`,
        cancel_url: `${HOST}/cancel-order`,
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

export const captureOrder = async (req, res) => {
  try {
    const token = await generateToken();
    const { token: payerToken } = req.query;

    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders/${payerToken}/capture`,
      {},
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

export const cancelOrder = (req, res) => {
  res.send("Canceling order");
};
