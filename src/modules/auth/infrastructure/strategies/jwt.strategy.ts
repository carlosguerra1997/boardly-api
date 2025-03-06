import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User } from '@/modules/user/domain/user'
import { UserRepository } from '@/modules/user/domain/user-repository'

interface PassportValidatePayload {
  userId: string
  iat: number
  exp: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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