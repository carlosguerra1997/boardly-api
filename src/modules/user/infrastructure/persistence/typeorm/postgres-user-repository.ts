import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

import { PostgresRepository } from '@/common/infrastructure/persistence/typeorm/postgres-repository'

import { User } from '@/modules/user/domain/user'
import { UserAssembler } from '@/modules/user/domain/user-assembler'
import { UserSchema, UserSchemaInterface } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'
import { UserRepository, UserSearchInput } from '@/modules/user/domain/user-repository'

@Injectable()
export class PostgresUserRepository 
  extends PostgresRepository<User, UserSchemaInterface>
  implements UserRepository
{
  constructor(
    @Inject(UserAssembler) userAssembler: UserAssembler<User, UserSchemaInterface>, 
    @InjectRepository(UserSchema) userRepository: Repository<UserSchemaInterface>
  ) {
    super(userAssembler, userRepository)
  }

  async obtainByEmail(email: string): Promise<User | null> {
    const dbUser = await this.repo.findOneBy({ email })

    if (!dbUser) {
      return null
    }

    const userEntity = await this.assembler.toEntity(dbUser)
    return userEntity
  }

  async searchDuplicate(
    userData: UserSearchInput
  ): Promise<boolean> {
    const search: FindOptionsWhere<UserSearchInput>[] = []

    if (userData.username) {
      search.push({ username: userData.username })
    }

    if (userData.email) { 
      search.push({ email: userData.email })
    }

    const dbUser = await this.repo.findOne({ 
      where: search
    })

    return dbUser ? true : false
  }
}