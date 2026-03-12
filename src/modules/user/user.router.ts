import { Router } from "express"; 
import { createUserController } from "./controllers/create-user.controller";
import { validateBody } from "@/middlewares/validateBody";
import { CreateUserSchema } from "./schemas/create-user.schema";
import { authenticate } from "@/middlewares/authenticate";
import { validateSubscription } from "@/middlewares/validateSubscription";
import { restrictTo } from "@/middlewares/restricTo";

export const router = Router();

router.post('/create', authenticate, restrictTo("admin", "user"), validateSubscription, validateBody(CreateUserSchema),  createUserController);

