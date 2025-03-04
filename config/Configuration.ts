export interface Configuration {
  env: string
  auth: Authentication
  database: Database
}

interface Authentication {
  accessToken: Token
  refreshToken: Token
}

interface Database {
  type: string
  host: string
  port: number
  username: string
  password: string
  database: string
  autoLoadEntities: boolean
  keepConnectionAlive: boolean
  logging: boolean
}

export interface Token {
  secret: string
  expiresIn: string
}