import { Result } from '@/common/presentation/result'

import { UserResponse } from '@/modules/user/application/response/user-response'
import { userSerialize } from '@/modules/user/presentation/v1/user-serialize'

export class UserReadView extends Result {
  constructor(user: UserResponse) {
    super(Result.successMessage)
    this.data = userSerialize(user)
  }
}