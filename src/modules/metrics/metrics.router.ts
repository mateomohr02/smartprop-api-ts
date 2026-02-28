import { validateTenant } from "@/middlewares/validateTenant";
import { Router } from "express";
import { createMetricController } from "./controllers/create-metric.controller";

export const router = Router();

router.post("/create", validateTenant, createMetricController)