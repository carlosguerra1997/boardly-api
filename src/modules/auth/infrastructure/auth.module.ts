import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from '@/common/common.module'
import { UserModule } from '@/modules/user/infrastructure/user.module'

import { LoginController } from '@/modules/auth/infrastructure/controllers/login.controller'
import { RefreshController } from '@/modules/auth/infrastructure/controllers/refresh.controller'
import { RegisterController } from '@/modules/auth/infrastructure/controllers/register.controller'

import { JwtAccessTokenGuard } from '@/modules/auth/infrastructure/guard/jwt-access-token.guard'
import { JwtRefreshTokenGuard } from '@/modules/auth/infrastructure/guard/jwt-refresh-token.guard'
import { JwtService } from '@/modules/auth/infrastructure/services/jwt/jwt-token-generator.service'
import { JwtAccessStrategy } from '@/modules/auth/infrastructure/strategies/jwt-access.strategy'
import { JwtRefreshStrategy } from '@/modules/auth/infrastructure/strategies/jwt-refresh.strategy'

import { LoginUseCase } from '@/modules/auth/application/login/login-use-case'
import { RefreshUserCase } from '@/modules/auth/application/refresh/refresh-use-case'
import { RegisterUseCase } from '@/modules/auth/application/register/register-use-case'

import { UserSchema } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'

import { CacheStored } from '@/common/domain/cache/cache-stored'
import { Hasher } from '@/common/domain/identity/hasher'
import { TokenGenerator } from '@/common/domain/identity/token-generator'

import { ArgonHasherService } from '@/modules/auth/infrastructure/services/hasher/argon-hasher.service'
import { RedisClient } from '@/common/infrastructure/services/redis/redis-client.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserSchema ]),
    CommonModule,
    JwtModule,
    UserModule
  ],
  controllers:  [
    LoginController,
    RefreshController,
    RegisterController
  ],
  providers: [
    LoginUseCase,
    RefreshUserCase,
    RegisterUseCase,
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    { provide: CacheStored, useClass: RedisClient },
    { provide: Hasher, useClass: ArgonHasherService },    
    { provide: TokenGenerator, useClass: JwtService },
  ]
})
export class AuthModule {}