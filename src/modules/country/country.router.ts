import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { postCountryController } from "./controllers/post-country.controller";
import { restrictTo } from "@/middlewares/restricTo";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { validateTenant } from "@/middlewares/validateTenant";
import { getAvailableCountriesController } from "./controllers/get-availables.controller";

export const router = Router();


//PANEL ROUTES
router.post("/create", authenticate, restrictTo("admin", "user"), validateSubscription, postCountryController);


//VISITORS ROUTES
router.get("/availables", validateTenant, getAvailableCountriesController);