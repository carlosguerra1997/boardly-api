import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User } from '@/modules/user/domain/user'
import { UserRepository } from '@/modules/user/domain/user-repository'

import { PassportValidatePayload } from '@/modules/auth/infrastructure/strategies/jwt-payload'

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    configService: ConfigService,
    @Inject(UserRepository) private userRepo: UserRepository
  ) {
    const accessTokenSecret = configService.get('auth.accessToken.secret') as string

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenSecret
    })
  }

  async validate(payload: PassportValidatePayload): Promise<User> {
    const user = await this.userRepo.obtainById(payload.userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}