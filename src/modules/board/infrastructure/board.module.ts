import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/modules/auth/infrastructure/auth.module';

import { BoardCreateController } from '@/modules/board/infrastructure/controllers/v1/board-create.controller'
import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'

import { BoardSchema } from '@/modules/board/infrastructure/persistence/typeorm/mapping/board-schema'

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ BoardSchema ])
  ],
  controllers: [
    BoardCreateController
  ],
  providers: [
    BoardCreateUseCase
  ]
})
export class BoardModule {}