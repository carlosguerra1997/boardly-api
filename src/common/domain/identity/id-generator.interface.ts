export interface IdGenerator {
  generate(): string
}

export const IdGenerator = Symbol('IdGenerator')