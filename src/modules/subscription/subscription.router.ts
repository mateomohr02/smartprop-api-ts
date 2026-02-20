import { validateTenant } from "@/middlewares/validateTenant";
import { Router } from "express";
import { createSubscriptionController } from "./controllers/create-subscription.controller";

export const router = Router();

router.post('/create', validateTenant, createSubscriptionController)