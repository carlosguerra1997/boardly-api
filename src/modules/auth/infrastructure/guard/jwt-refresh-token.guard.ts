import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') implements CanActivate {
  constructor() {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const refreshToken = request?.cookies?.refreshToken

    if (!refreshToken) {
      throw new UnauthorizedException()
    }

    return super.canActivate(context) as Promise<boolean>
  }
}