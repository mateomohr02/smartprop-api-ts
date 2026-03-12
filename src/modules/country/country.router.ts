import { authenticate } from "@/middlewares/authenticate";
import { Router } from "express";
import { postCountryController } from "./controllers/post-country.controller";
import { restrictTo } from "@/middlewares/restricTo";
import { validateSubscription } from "@/middlewares/validateSubscription";

export const router = Router();

router.post("/create", authenticate, restrictTo("admin", "user"), validateSubscription, postCountryController)