import { Router } from "express"; 
import { createUserController } from "./controllers/create-user.controller";
import { validateBody } from "@/middlewares/validateBody";
import { CreateUserSchema } from "./schemas/create-user.schema";

export const router = Router();

router.post('/create', validateBody(CreateUserSchema), createUserController);

