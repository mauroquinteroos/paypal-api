import axios from "axios";
import url from "url";
import {
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  PAYPAL_API_URL,
} from "../config";

export const generateToken = async () => {
  const params = new url.URLSearchParams({ grant_type: "client_credentials" });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET,
    },
  };

  const {
    data: { access_token },
  } = await axios.post(`${PAYPAL_API_URL}/v1/oauth2/token`, params, config);
  return access_token;
};
