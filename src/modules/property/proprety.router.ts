const { Router } = require('express');

import { authenticate } from "@/middlewares/authenticate";
import { createPropertyController } from "./controllers/create-property.controller";
import { updatePropertyController } from "./controllers/update-property.controller";
import { validateSubscription } from "@/middlewares/validateSubscription";

export const router = Router();

router.post('/create', authenticate, validateSubscription, createPropertyController);
router.put('/update', authenticate, validateSubscription, updatePropertyController);