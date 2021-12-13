import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelOrder,
} from "../controllers/payment.controller";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-order", cancelOrder);

export default router;
