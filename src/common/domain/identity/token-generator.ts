export interface TokenGenerator {
  generate(userId: string): Promise<{ accessToken: string, refreshToken: string }>
  refresh(userId: string): Promise<string>
}

export const TokenGenerator = Symbol('TokenGenerator')