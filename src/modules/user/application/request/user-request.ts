import { User } from '@/modules/user/domain/user'

export class UserRequest {
  constructor() {}

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

  public static update(user: User): void {
    user.modify(
      user.getUsername(), 
      user.getEmail()
    )
  }
}