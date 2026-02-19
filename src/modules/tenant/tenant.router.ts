import { validateBody } from "@/middlewares/validateBody";
import { createTenantController } from "./controllers/tenant.controller";
import { Router } from "express";
import { CreateTenantSchema } from "./schemas/create-tenant.schema";


export const router = Router();

router.post("/create", validateBody(CreateTenantSchema), createTenantController)