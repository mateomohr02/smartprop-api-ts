import { authenticate } from "@/middlewares/authenticate";
import { validateBody } from "@/middlewares/validateBody";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { Router } from "express";
import { FindOrCreateProvinceSchema } from "./schemas/findOrCreate-province.schema";
import { postProvinceController } from "./controllers/post-province.controller";
import { validateTenant } from "@/middlewares/validateTenant";
import { getAvailableProvincesController } from "./controllers/get-available.controller";
import { GetProvincesForCountrySchema } from "./schemas/getProvincesForCountry.schema";
import { restrictTo } from "@/middlewares/restricTo";

export const router = Router();

router.post("/create", authenticate, restrictTo("admin", "user"), validateSubscription, validateBody(FindOrCreateProvinceSchema), postProvinceController )
router.get("/availables", validateTenant, validateBody(GetProvincesForCountrySchema), getAvailableProvincesController)