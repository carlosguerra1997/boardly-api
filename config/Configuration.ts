export interface Configuration {
  env: string
  auth: Authentication
}

interface Authentication {
  accessToken: Token
  refreshToken: Token
}

export interface Token {
  secret: string
  expiresIn: string
}