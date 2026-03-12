import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { findOrCreateCharacteristicController } from "./controllers/findOrCreateCharacteristic.controller";
import { FindOrCreateCharacteristicSchema } from "./schemas/findOrCreateCharacteristic.schema";
import { validateBody } from "@/middlewares/validateBody";
import { validateSubscription } from "@/middlewares/validateSubscription";

export const router = Router();

router.put('/relate', authenticate, validateSubscription, validateBody(FindOrCreateCharacteristicSchema), findOrCreateCharacteristicController)