import { Inject, Injectable } from '@nestjs/common'

import { User } from '@/modules/user/domain/user'
import { UserRepository } from '@/modules/user/domain/user-repository'

import { UserNotFoundException } from '@/modules/user/application/exceptions/user-not-found-exception'

@Injectable()
export class UserRead {
  constructor(
    @Inject(UserRepository) private readonly userRepo: UserRepository
  ) {}

  async dispatch(id: string): Promise<User> {
    const user = await this.userRepo.obtainById(id)
    if (null === user) {
      throw new UserNotFoundException()
    }

    return user
  }
}