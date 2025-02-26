import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/infrastructure/auth.module'
import { CommonModule } from '@/common/common-module'

@Module({
  imports: [
    AuthModule,
    CommonModule
  ]
})
export class AppModule {}
