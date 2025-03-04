import { EntitySchema } from 'typeorm'

export interface UserSchemaInterface {
  id: string
  username: string
  email: string
  password: string
  createdAt: number
  updatedAt: number
}

export const UserSchema = new EntitySchema<UserSchemaInterface>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: String,
      length: 50,
      primary: true
    },
    username: {
      type: String,
      length: 30,
      unique: true
    },
    email: {
      type: String,
      length: 80,
      unique: true
    },
    password: {
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
  }
})