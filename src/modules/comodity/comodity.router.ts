import { Router } from "express";

import { authenticate } from "@/middlewares/authenticate";

import { findOrCreateComodityController } from "./controllers/findOrCreateComodity.controller";
import { validateBody } from "@/middlewares/validateBody";
import { FindOrCreateComoditySchema } from "./schemas/findOrCreateComodity.schema";
import { validateSubscription } from "@/middlewares/validateSubscription";

export const router = Router();

router.put("/relate", authenticate, validateSubscription, validateBody(FindOrCreateComoditySchema), findOrCreateComodityController);


