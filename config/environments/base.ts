import { Configuration } from '@/config/Configuration'
import { loadEnvFile } from 'process'

loadEnvFile()

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD
} = process.env

const databasePort: string = DATABASE_PORT as string

export const getBaseConfig = (): Configuration => ({
  env: 'dev',
  auth: {
    accessToken: {
      secret: ACCESS_TOKEN_SECRET || 'access_secret_dev',
      expiresIn: ACCESS_TOKEN_EXPIRATION ||'15m',
    },
    refreshToken: {
      secret: REFRESH_TOKEN_SECRET || 'refresh_secret_dev',
      expiresIn: REFRESH_TOKEN_EXPIRATION || '7d'
    }
  },
  database: {
    type: 'postgres',
    host: DATABASE_HOST || 'database',
    port: parseInt(databasePort) || 5432,
    database: DATABASE_NAME || 'boardly',
    username: DATABASE_USERNAME || 'boardly-user',
    password: DATABASE_PASSWORD || 'boardly-root',
    autoLoadEntities: true,
    keepConnectionAlive: true,
    logging: false
  }
})