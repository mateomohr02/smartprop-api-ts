import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { findOrCreateCharacteristicController } from "./controllers/findOrCreateCharacteristic.controller";

export const router = Router();

router.put('/relate', authenticate, findOrCreateCharacteristicController)