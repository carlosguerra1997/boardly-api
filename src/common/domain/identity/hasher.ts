export interface Hasher {
  hash(item: string): Promise<string>
  compare(item: string, itemCompared: string): Promise<boolean>
}

export const Hasher = Symbol('Hasher')