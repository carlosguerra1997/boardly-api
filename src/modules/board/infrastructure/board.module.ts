import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@/modules/auth/infrastructure/auth.module';
import { CommonModule } from '@/common/common.module'

import { BoardAssembler as IBoardAssembler } from '@/modules/board/domain/board-assembler'
import { BoardRepository } from '@/modules/board/domain/board-repository'

import { BoardCreateController } from '@/modules/board/infrastructure/controllers/v1/board-create.controller'
import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'

import { BoardAssembler } from '@/modules/board/infrastructure/persistence/typeorm/board-assembler'
import { BoardSchema } from '@/modules/board/infrastructure/persistence/typeorm/mapping/board-schema'
import { PostgresBoardRepository } from '@/modules/board/infrastructure/persistence/typeorm/postgres-board-repository'


@Module({
  imports: [
    AuthModule,
    CommonModule,
    TypeOrmModule.forFeature([ BoardSchema ])
  ],
  controllers: [
    BoardCreateController
  ],
  providers: [
    BoardCreateUseCase,
    { provide: IBoardAssembler, useClass: BoardAssembler },
    { provide: BoardRepository, useClass: PostgresBoardRepository }
  ]
})
export class BoardModule {}