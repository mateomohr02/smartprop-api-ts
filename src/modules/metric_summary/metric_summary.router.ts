import { Router } from "express";
import { createMetricSummariesController } from "./controllers/create-metric_summaries.controller";
import { getMetricSummariesController } from "./controllers/get-metric_summaries.controller";
import { authenticate } from "@/middlewares/authenticate";

export const router = Router();

router.post("/generate", createMetricSummariesController)
router.get("/get", authenticate, getMetricSummariesController)