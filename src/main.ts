import { NestFactory } from '@nestjs/core'
import { AppModule } from './module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)

  console.log(`🚀 API running on http://localhost:3000`);
}

bootstrap()