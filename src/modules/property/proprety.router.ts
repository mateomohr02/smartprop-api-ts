const { Router } = require('express');

import { authenticate } from "@/middlewares/authenticate";
import { createPropertyController } from "./controllers/create-property.controller";
import { updatePropertyController } from "./controllers/update-property.controller";

export const router = Router();

router.post('/create', authenticate, createPropertyController);
router.post('/update', authenticate, updatePropertyController);