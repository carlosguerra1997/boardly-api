import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Token } from '@/config/Configuration'

export interface TokenConfig {
  secretOrKey: string
  jwtFromRequest: (req: Request) => string | null
}

@Injectable()
export class TokenManager {
  private tokenConfigs: Record<string, TokenConfig> = {}

  constructor(
    private readonly configService: ConfigService
  ) {
    const accessTokenConfig = this.configService.get<Token>('auth.accessToken')

    this.tokenConfigs['accessToken'] = {
      secretOrKey: accessTokenConfig?.secret || '',
      jwtFromRequest: (req) => req.headers.get('Authorization')
    }
  }

  public getConfig(tokenType: 'accessToken' | 'refreshToken'): TokenConfig {
    return this.tokenConfigs[tokenType]
  }
}