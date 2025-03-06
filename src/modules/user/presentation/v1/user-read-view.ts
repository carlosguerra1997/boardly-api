import { Result } from '@/common/domain/identity/result'

import { User } from '@/modules/user/domain/user'
import { userSerialize } from '@/modules/user/presentation/v1/user-serialize'

export class UserReadView extends Result {
  constructor(user: User) {
    super(Result.successMessage)
    this.data = userSerialize(user)
  }
}