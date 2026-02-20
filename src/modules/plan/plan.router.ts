import { Router } from "express";
import { createPlanController } from "./controllers/create-plan.controller";

export const router = Router();

router.post('/create', createPlanController)