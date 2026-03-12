import cron from "node-cron"
import { updateHeat } from "../services/update-heat.service"

cron.schedule("*/11 * * * *", async () => {
  console.log("Updating Heat...")
  await updateHeat()
})