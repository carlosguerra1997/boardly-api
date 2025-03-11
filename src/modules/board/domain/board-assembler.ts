import { Assembler } from '@/common/domain/identity/assembler'

export interface BoardAssembler<T, U> extends Assembler<T, U> {}

export const BoardAssembler = Symbol('BoardAssembler')