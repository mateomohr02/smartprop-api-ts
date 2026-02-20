import { Router } from "express";
import { createPlanController } from "./controllers/create-plan.controller";
import { updatePlanStatusController } from "./controllers/update-plan-status.controller";

export const router = Router();

router.post('/create', createPlanController);
router.put('/update/status/:planId', updatePlanStatusController);