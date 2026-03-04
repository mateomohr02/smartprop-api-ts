import cron from "node-cron"
import { generateMetricSummaries } from "@/modules/metric_summary/services/create-metric_summary.service"

cron.schedule("*/10 * * * *", async () => {
  console.log("Generating metric summaries...")
  await generateMetricSummaries()
})