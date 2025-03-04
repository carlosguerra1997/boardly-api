import { NestFactory } from '@nestjs/core'
import { loadEnvFile } from 'process'

import { AppModule } from 'src/app.module'

loadEnvFile()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)

  console.log(`🚀 API running on http://localhost:3000`);
}

bootstrap()