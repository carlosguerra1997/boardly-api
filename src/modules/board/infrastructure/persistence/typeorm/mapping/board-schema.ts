import { EntitySchema } from 'typeorm'

import { BoardMemberSchemaInterface } from '@/modules/board-member/infrastructure/persistence/typeorm/mapping/board-member-schema'

export interface BoardSchemaInterface{
  id: string
  name: string
  description: string | null
  status: string
  // members: BoardMemberSchemaInterface
  createdAt: number
  updatedAt: number
}

export const BoardSchema = new EntitySchema<BoardSchemaInterface>({
  name: 'Board',
  tableName: 'boards',
  columns: {
    id: {
      type: String,
      length: 50,
      primary: true
    },
    name: {
      type: String,
      length: 255
    },
    description: {
      type: String,
      length: 255,
      nullable: true
    },
    status: {
      type: String,
      length: 50,
    },
    createdAt: {
      name: 'created_at',
      type: 'bigint'
    },
    updatedAt: {
      name: 'updated_at',
      type: 'bigint'
    }
  },
  /* relations: {
    members: {
      type: 'one-to-many',
      target: 'BoardMember',
      inverseSide: 'board'
    }
  } */
})