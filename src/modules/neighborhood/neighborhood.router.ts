import { authenticate } from "@/middlewares/authenticate";
import { validateBody } from "@/middlewares/validateBody";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { Router } from "express";
import { validateTenant } from "@/middlewares/validateTenant";
import { restrictTo } from "@/middlewares/restricTo";
import { FindOrCreateNeighborhoodSchema } from "./schemas/findOrCreate-neighborhood.schema";
import { GetNeighborhoodsForCitySchema } from "./schemas/getNeighborhoodsForCity.schema";
import { getAvailableNeighborhoodsController } from "./controllers/get-available.controller";
import { postNeighborhoodController } from "./controllers/post-neighborhood.controller";

export const router = Router();

router.post("/create", authenticate, restrictTo("admin", "user"), validateSubscription, validateBody(FindOrCreateNeighborhoodSchema), postNeighborhoodController )
router.get("/availables", validateTenant, validateBody(GetNeighborhoodsForCitySchema), getAvailableNeighborhoodsController)