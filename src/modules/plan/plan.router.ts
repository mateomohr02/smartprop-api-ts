import { Router } from "express";
import { createPlanController } from "./controllers/create-plan.controller";
import { updatePlanStatusController } from "./controllers/update-plan-status.controller";
import { validateBody } from "@/middlewares/validateBody";
import { CreatePlanSchema } from "./schemas/createPlan.schema";
import { UpdatePlanSchema } from "./schemas/update-PlanStatus.schema";

export const router = Router();

router.post('/create', validateBody(CreatePlanSchema), createPlanController);
router.put('/update/status/:planId', validateBody(UpdatePlanSchema),updatePlanStatusController);