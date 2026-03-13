import { authenticate } from "@/middlewares/authenticate";
import { validateBody } from "@/middlewares/validateBody";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { Router } from "express";
import { validateTenant } from "@/middlewares/validateTenant";
import { restrictTo } from "@/middlewares/restricTo";
import { GetCitiesForProvinceSchema } from "./schemas/getCitiesForProvince.schema";
import { FindOrCreateCitySchema } from "./schemas/findOrCreate-city.schema";
import { postCityController } from "./controllers/post-city.controller";
import { getAvailableCitiessController } from "./controllers/get-available.controller";

export const router = Router();

router.post("/create", authenticate, restrictTo("admin", "user"), validateSubscription, validateBody(FindOrCreateCitySchema), postCityController )
router.get("/availables", validateTenant, validateBody(GetCitiesForProvinceSchema), getAvailableCitiessController)