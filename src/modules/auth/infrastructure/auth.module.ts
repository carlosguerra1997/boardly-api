import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from '@/common/common.module'
import { UserModule } from '@/modules/user/infrastructure/user.module'

import { LoginController } from '@/modules/auth/infrastructure/controllers/login.controller'
import { RegisterController } from '@/modules/auth/infrastructure/controllers/register.controller'

import { JwtService } from '@/modules/auth/infrastructure/services/jwt/jwt-token-generator.service'
import { LoginUseCase } from '@/modules/auth/application/login/login-use-case'
import { RegisterUseCase } from '@/modules/auth/application/register/register-use-case'
import { TokenManager } from '@/modules/auth/infrastructure/services/jwt/jwt-token-manager.service'
import { UserSchema } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'

import { CacheStored } from '@/common/domain/cache/cache-stored'
import { RedisClient } from '@/common/infrastructure/services/redis/redis-client.service'
import { TokenGenerator } from '@/common/domain/identity/token-generator'

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserSchema ]),
    CommonModule,
    JwtModule,
    UserModule
  ],
  controllers:  [
    LoginController,
    RegisterController
  ],
  providers: [    
    LoginUseCase,
    RegisterUseCase,
    TokenManager,
    { provide: TokenGenerator, useClass: JwtService },
    { provide: CacheStored, useClass: RedisClient }
  ]
})
export class AuthModule {}