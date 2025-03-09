import { Entity } from '@/common/domain/identity/entity'

export class Board extends Entity {
  private name: string
  private description: string

  constructor(
    id: string,
    name: string,
    description: string
  ) {
    super(id)

    this.name = name
    this.description = description
  }

  public getName(): string {
    return this.name
  }

  public getDescription(): string {
    return this.description
  }
}