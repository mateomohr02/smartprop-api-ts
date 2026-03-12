import { validateTenant } from "@/middlewares/validateTenant";
import { Router } from "express";
import { createMetricController } from "./controllers/create-metric.controller";
import { validateBody } from "@/middlewares/validateBody";
import { CreateMetricSchema } from "./schemas/create-metric.schema";

export const router = Router();

router.post("/create", validateTenant,  validateBody(CreateMetricSchema), createMetricController)