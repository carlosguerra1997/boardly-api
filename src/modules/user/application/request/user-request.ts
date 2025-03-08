import { User } from '@/modules/user/domain/user'

export class UserRequest {
  public static create(
    id: string,
    username: string,
    email: string,
    password: string
  ): User {
    return new User(
      id,
      username,
      email,
      password
    )
  }
}