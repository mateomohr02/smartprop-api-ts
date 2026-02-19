const { Router } = require('express');

import { authenticate } from "@/middlewares/authenticate";
import { createPropertyController } from "./controllers/create-property.controller";

export const router = Router();

router.post('/create', authenticate, createPropertyController);
