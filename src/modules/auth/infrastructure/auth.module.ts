import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { LoginController } from '@/modules/auth/infrastructure/controllers/login.controller'

import { LoginUseCase } from '@/modules/auth/application/login/login-use-case'

import { JwtService } from '@/modules/auth/infrastructure/services/jwt/jwt.service'

@Module({
  controllers:  [LoginController],
  providers: [
    LoginUseCase,
    JwtService
  ],
  imports: [ JwtModule ]
})
export class AuthModule {}