import { Router } from 'express'
import { loginUserController } from './controllers/login-user.controller';
import { validateBody } from '@/middlewares/validateBody';
import { LoginUserSchema } from './schema/user-login.schema';

export const router = Router()

router.post('/login', validateBody(LoginUserSchema), loginUserController);