import { type Request } from 'express'

export const requestFixture: Request = {
  user: {
    id: 'test-id',
    username: 'test-user',
    email: 'testuser@test.com'
  }
} as unknown as Request