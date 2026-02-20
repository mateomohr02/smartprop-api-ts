import { Router } from 'express'
import { loginUserController } from './controllers/login-user.controller';
import { validateBody } from '@/middlewares/validateBody';
import { LoginUserSchema } from './schema/user-login.schema';
import { EnrollTenantSchema } from './schema/enroll-tenant.schema';
import { enrollTenantController } from './controllers/enroll-tenant.controller';

export const router = Router()

router.post('/login', validateBody(LoginUserSchema), loginUserController);
router.post('/enroll-tenant', validateBody(EnrollTenantSchema), enrollTenantController)