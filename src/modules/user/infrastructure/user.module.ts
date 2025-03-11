import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommonModule } from '@/common/common.module'

import { UserAssembler } from '@/modules/user/infrastructure/persistence/typeorm/assembler/user-assembler'
import { UserAssembler as IUserAssembler } from '@/modules/user/domain/user-assembler'

import { PostgresUserRepository } from '@/modules/user/infrastructure/persistence/typeorm/postgres-user-repository'
import { UserRepository } from '@/modules/user/domain/user-repository'
import { UserSchema } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'

import { UserReadController } from '@/modules/user/infrastructure/controllers/v1/user-read.controller'
import { UserRead } from '@/modules/user/application/reader/user-read'

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([ UserSchema ])
  ],
  controllers: [
    UserReadController
  ],
  providers: [
    UserRead,
    { provide: IUserAssembler, useClass: UserAssembler },
    { provide: UserRepository, useClass: PostgresUserRepository }
  ],
  exports: [
    UserRepository
  ]
})
export class UserModule {}