import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Board } from '@/modules/board/domain/board'
import { BoardRepository } from '@/modules/board/domain/board-repository'

import { BoardSchema, BoardSchemaInterface } from '@/modules/board/infrastructure/persistence/typeorm/mapping/board-schema'
import { PostgresRepository } from '@/common/infrastructure/persistence/typeorm/postgres-repository'
import { BoardAssembler } from '@/modules/board/domain/board-assembler'

@Injectable()
export class PostgresBoardRepository
  extends PostgresRepository<Board, BoardSchemaInterface>
  implements BoardRepository
{
  constructor (
    @Inject() boardAssembler: BoardAssembler<Board, BoardSchemaInterface>,
    @InjectRepository(BoardSchema) boardRepository: Repository<BoardSchemaInterface>
  ) {
    super(boardAssembler, boardRepository)
  }
}