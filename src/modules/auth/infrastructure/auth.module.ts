import { Module } from '@nestjs/common'

import { LoginController } from '@/modules/auth/infrastructure/controllers/login.controller'

@Module({
  controllers:  [LoginController]
})
export class AuthModule {}