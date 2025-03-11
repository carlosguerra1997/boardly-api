import { Injectable } from '@nestjs/common'

import { User } from '@/modules/user/domain/user'
import { UserAssembler as IUserAssembler } from '@/modules/user/domain/user-assembler'
import { UserSchemaInterface } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'

@Injectable()
export class UserAssembler implements IUserAssembler<User, UserSchemaInterface> {
  toDatabase(item: User): UserSchemaInterface {
    return {
      id: item.getId(),
      username: item.getUsername(),
      email: item.getEmail(),
      password: item.getPassword(),
      createdAt: item.getCreatedAt(),
      updatedAt: item.getUpdatedAt()
    }
  }

  toEntity(item: UserSchemaInterface): User {
    return new User(
      item.id,
      item.username,
      item.email,
      item.password
    )
  }
}