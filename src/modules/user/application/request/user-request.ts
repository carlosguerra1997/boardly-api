import { User } from '@/modules/user/domain/user'

export class UserRequest {
  private id: string
  private username: string
  private email: string
  private password: string

  constructor(
    id: string,
    username: string,
    email: string,
    password: string
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
  }

  public make(): User {
    return new User(
      this.id,
      this.username,
      this.email,
      this.password
    )
  }
}