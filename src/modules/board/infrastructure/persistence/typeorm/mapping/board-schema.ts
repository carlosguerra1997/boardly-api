import { EntitySchema } from 'typeorm'

import { UserSchemaInterface } from '@/modules/user/infrastructure/persistence/typeorm/mapping/user-schema'

export interface BoardSchemaInterface{
  id: string
  name: string
  description: string
  user: UserSchemaInterface
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
      length: 255
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
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: {
        name: 'user_id'
      }
    }
  }
})