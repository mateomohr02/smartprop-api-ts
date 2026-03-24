const { Router } = require('express');

import { authenticate } from "@/middlewares/authenticate";
import { createPropertyController } from "./controllers/create-property.controller";
import { updatePropertyController } from "./controllers/update-property.controller";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { updateHeatController } from "./controllers/update-heat-property.controller.dev";
import { restrictTo } from "@/middlewares/restricTo";
import { validateBody } from "@/middlewares/validateBody";
import { CreatePropertySchema } from "./schemas/create-property.schema";
import { UpdatePropertySchema } from "./schemas/update-property.schema";
import { getPropertiesController } from "./controllers/get-properties.controller";

export const router = Router();


router.get('/', authenticate, restrictTo("admin", "user", "viewer"), validateSubscription, getPropertiesController)
router.post('/create', authenticate, restrictTo("admin", "user"), validateSubscription, validateBody(CreatePropertySchema), validateSubscription, createPropertyController);
router.put('/update', authenticate, restrictTo("admin", "user"), validateSubscription, validateBody(UpdatePropertySchema), validateSubscription, updatePropertyController);
router.put('/heat', updateHeatController)