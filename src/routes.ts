import { Router } from "express";

//---------
// ROTUERS
//---------

import { router as authRouter } from "@/modules/auth/auth.router";
import { router as tenantRouter } from "@/modules/tenant/tenant.router";
import { router as userRouter } from "@/modules/user/user.router";
import { router as propertyRouter } from "@/modules/property/proprety.router";
import { router as planRouter } from "@/modules/plan/plan.router";
import { router as subscriptionRotuer } from "@/modules/subscription/subscription.router";
import { router as comodityRouter } from "@/modules/comodity/comodity.router";
import { router as characteristicRouter } from "@/modules/characteristic/characteristic.router";
import { router as roomRouter } from "@/modules/room/room.router";
import { router as metricRouter } from "@/modules/metrics/metrics.router";
import { router as metricSummaryRouter } from "@/modules/metric_summary/metric_summary.router";
import { router as countryRouter } from "@/modules/country/country.router";
import { router as provinceRouter } from "@/modules/province/province.router";
import { router as cityRouter } from "@/modules/city/city.router";
import { router as neighborhoodRouter } from "@/modules/neighborhood/neighborhood.router";

//-------------
// MIDDLEWARES
//-------------



//--------
// ROUTES
//--------

export const router = Router();

router.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

//---------
// TENANTS
//---------

router.use("/auth", authRouter);
router.use("/tenant", tenantRouter);
router.use("/user", userRouter);
router.use("/plan", planRouter);
router.use("/subscription", subscriptionRotuer);

//----------
// PROPERTY
//----------

router.use("/property", propertyRouter);
router.use("/comodity", comodityRouter);
router.use("/room", roomRouter);
router.use("/characteristic", characteristicRouter);
router.use("/country", countryRouter);
router.use("/province", provinceRouter);
router.use("/city", cityRouter);
router.use("/neighborhood", neighborhoodRouter);

//---------
// METRICS
//---------

router.use("/metric", metricRouter);
router.use("/metric-summary", metricSummaryRouter);
