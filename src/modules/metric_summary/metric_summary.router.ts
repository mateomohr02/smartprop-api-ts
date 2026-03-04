import { Router } from "express";
import { createMetricSummariesController } from "./controllers/create-metric_summaries.controller";

export const router = Router();

router.post("/generate", createMetricSummariesController)