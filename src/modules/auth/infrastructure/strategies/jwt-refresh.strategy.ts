import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'

import { User } from '@/modules/user/domain/user'
import { UserRepository } from '@/modules/user/domain/user-repository'

import { PassportValidatePayload } from '@/modules/auth/infrastructure/strategies/jwt-payload'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    configService: ConfigService,
    @Inject(UserRepository) private userRepo: UserRepository
  ) {
    const refreshTokenSecret = configService.get('auth.refreshToken.secret') as string

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.refreshToken
      ]),
      ignoreExpiration: true,
      secretOrKey: refreshTokenSecret
    })
  }

  async validate(payload: PassportValidatePayload): Promise<{ userId: string }> {
    const { userId } = payload
    const user = await this.userRepo.obtainById(userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return { userId: user.getId() }
  }
}