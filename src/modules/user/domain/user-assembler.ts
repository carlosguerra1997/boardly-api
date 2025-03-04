import { Assembler } from '@/common/domain/identity/assembler'

export interface UserAssembler<T, U> extends Assembler<T, U> {}

export const UserAssembler = Symbol('UserAssembler')