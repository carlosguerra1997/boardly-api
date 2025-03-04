import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/infrastructure/auth.module'
import { CommonModule } from '@/common/common.module'
import { UserModule } from '@/modules/user/infrastructure/user.module'

@Module({
  imports: [
    AuthModule,
    CommonModule,
    UserModule
  ]
})
export class AppModule {}
