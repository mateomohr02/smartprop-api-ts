import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { relateRoomsController } from "./controllers/relateRooms.controller";

export const router = Router();

router.put("/relate", authenticate, relateRoomsController);