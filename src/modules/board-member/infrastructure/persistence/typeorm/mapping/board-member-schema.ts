import { EntitySchema } from 'typeorm'

import { BoardSchemaInterface } from '@/modules/board/infrastructure/persistence/typeorm/mapping/board-schema'
import { UserSchemaInterface } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'

export interface BoardMemberSchemaInterface {
  id: string
  board: BoardSchemaInterface
  user: UserSchemaInterface
  role: 'owner' | 'editor' | 'viewer'
  active: boolean
  isOwner: boolean
  createdAt: number
  updatedAt: number
}

export const BoardMemberSchema = new EntitySchema<BoardMemberSchemaInterface>({
  name: 'BoardMember',
  tableName: 'board_members',
  columns: {
    id: {
      type: String,
      length: 50,
      primary: true
    },
    role: {
      type: String,
      length: 50,
    },
    active: {
      type: Boolean,
      default: true
    },
    isOwner: {
      name: 'is_owner',
      type: Boolean,
      default: false
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
  relations: {
    board: {
      type: 'many-to-one',
      target: 'Board',
      joinColumn: {
        name: 'board_id'
      }
    },
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'user_id'
      }
    }
  }
})