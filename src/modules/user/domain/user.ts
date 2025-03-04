import { Entity } from '@/common/domain/identity/entity'

export class User extends Entity {
  private username: string
  private email: string
  private password: string

  constructor(
    id: string,
    username: string,
    email: string,
    password: string
  ) {
    super(id)

    this.username = username
    this.email = email
    this.password = password
  }

  public modify(
    username: string,
    email: string,
  ): void {
    this.username = username
    this.email = email
    this.setUpdatedAt(new Date().getTime())
  }

  public getUsername(): string {
    return this.username
  }

  public getEmail(): string {
    return this.email
  }

  public getPassword(): string {
    return this.password
  }
}