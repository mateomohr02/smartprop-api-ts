import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { relateRoomsController } from "./controllers/relateRooms.controller";
import { validateSubscription } from "@/middlewares/validateSubscription";

export const router = Router();

router.put("/relate", authenticate, validateSubscription, relateRoomsController);