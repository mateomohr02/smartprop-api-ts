import { Router } from "express";

import { authenticate } from "@/middlewares/authenticate";

import { findOrCreateComodityController } from "./controllers/findOrCreateComodity.controller";

export const router = Router();

router.put("/relate", authenticate, findOrCreateComodityController);


