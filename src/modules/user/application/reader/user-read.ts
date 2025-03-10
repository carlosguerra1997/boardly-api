import { Inject, Injectable } from '@nestjs/common'

import { UserRepository } from '@/modules/user/domain/user-repository'

import { UserResponse } from '@/modules/user/application/response/user-response'
import { UserNotFoundException } from '@/modules/user/application/exceptions/user-not-found-exception'

@Injectable()
export class UserRead {
  constructor(
    @Inject(UserRepository) private readonly userRepo: UserRepository
  ) {}

  async dispatch(id: string): Promise<UserResponse> {
    const user = await this.userRepo.obtainById(id)
    if (null === user) {
      throw new UserNotFoundException()
    }

    const userResponse = new UserResponse(
      user.getId(),
      user.getUsername(),
      user.getEmail()
    )

    return userResponse
  }
}