import { ListRepository } from '@/common/domain/identity/list-repository'

import { User } from '@/modules/user/domain/user'

export interface UserSearchInput {
  username: string | null
  email: string | null
}

export interface UserRepository extends ListRepository<User> {
  obtainByEmail(email: string): Promise<User | null>
  searchDuplicate(userData: UserSearchInput): Promise<boolean>
}

export const UserRepository = Symbol('UserRepository')