export interface TokenGenerator {
  generate(userId: string): Promise<{ accessToken: string, refreshToken: string }>
}

export const TokenGenerator = Symbol('TokenGenerator')