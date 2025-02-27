import * as dotenv from 'dotenv'

import { Configuration } from '@/config/Configuration'

dotenv.config()

export const getBaseConfig = (): Configuration => ({
  env: 'dev',
  auth: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET || 'access_secret_dev',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION ||'15m',
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_dev',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d'
    }
  }
})