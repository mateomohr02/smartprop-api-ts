import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { postCountryController } from "./controllers/post-country.controller";
import { restrictTo } from "@/middlewares/restricTo";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { validateTenant } from "@/middlewares/validateTenant";
import { getAvailableCountriesController } from "./controllers/get-availables.controller";
import { validateBody } from "@/middlewares/validateBody";
import { FindOrCreateCountrySchema } from "./schemas/findOrCreate-country.schema";

export const router = Router();

//PANEL ROUTES
router.post("/create", authenticate, restrictTo("admin", "user"), validateSubscription, validateBody(FindOrCreateCountrySchema), postCountryController);


//VISITORS ROUTES
router.get("/availables", validateTenant, getAvailableCountriesController);