import express from "express";
import cors from "cors";
import carRoutes from "./routes/car.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cars", carRoutes);

export default app;