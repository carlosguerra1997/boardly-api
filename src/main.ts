import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from 'src/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())

  await app.listen(3000)
  console.log(`🚀 API running on http://localhost:3000`);
}

bootstrap()