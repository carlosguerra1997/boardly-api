import { Controller, Post, Body } from '@nestjs/common'

import { type LoginPayload } from '@/modules/auth/application/login-payload'

// Create DTO/Payload for Body
// Validate with ZOD in a middleware

@Controller('auth')
export class LoginController {
  @Post('login')
  login(@Body() body: LoginPayload) {
    return body
  }
}