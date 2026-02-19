import { app } from './app'
import { env } from './config/env'
import { initModels } from './db/models'

const start = async () => {
  await initModels()
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`)
  })
}

start()
