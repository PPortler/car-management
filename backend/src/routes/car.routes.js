import express from "express";
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getCarById,
} from "../controllers/car.controller.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;