import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { relateRoomsController } from "./controllers/relateRooms.controller";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { RelateRoomsSchema } from "./schemas/relateRooms.schema";
import { validateBody } from "@/middlewares/validateBody";

export const router = Router();

router.put("/relate", authenticate, validateSubscription, validateBody(RelateRoomsSchema), validateSubscription, relateRoomsController);