import { router as authRouter } from '@/modules/auth/auth.router';
import { router as tenantRouter } from '@/modules/tenant/tenant.router';
import { router as userRouter } from '@/modules/user/user.router';
import { router as propertyRouter } from '@/modules/property/proprety.router';
import { router as planRouter } from '@/modules/plan/plan.router';
import { router as subscriptionRotuer } from '@/modules/subscription/subscription.router';
import { router as comodityRouter } from '@/modules/comodity/comodity.router';
import { router as characteristicRouter } from '@/modules/characteristic/characteristic.router';
import {router as roomRouter} from '@/modules/room/room.router';

import { Router } from 'express'
import { validateTenant } from './middlewares/validateTenant';

export const router = Router()

router.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' })
})

router.use('/auth', authRouter);
router.use('/tenant', tenantRouter);
router.use('/user', validateTenant, userRouter);
router.use('/property', propertyRouter);
router.use('/comodity', comodityRouter);
router.use('/room',  roomRouter)
router.use('/characteristic', characteristicRouter);
router.use('/plan', planRouter);
router.use('/subscription', subscriptionRotuer);

