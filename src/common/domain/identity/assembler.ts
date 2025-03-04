export interface Assembler<T, U> {
  toDatabase(item: T): U
  toEntity(item: U): T
}