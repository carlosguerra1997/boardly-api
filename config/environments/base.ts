import { Configuration } from '@/config/Configuration'

const databasePort: string = process.env.DATABASE_PORT as string

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
  },
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'database',
    port: parseInt(databasePort) || 5432,
    database: process.env.DATABASE_NAME || 'boardly',
    username: process.env.DATABASE_USERNAME || 'boardly-user',
    password: process.env.DATABASE_PASSWORD || 'boardly-root',
    autoLoadEntities: true,
    keepConnectionAlive: true,
    logging: false
  }
})