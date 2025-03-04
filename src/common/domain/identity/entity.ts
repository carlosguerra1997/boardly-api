export class Entity {
  private id: string
  private createdAt: number
  private updatedAt: number

  constructor(
    id: string,
    createdAt: number = new Date().getTime(),
    updatedAt: number = new Date().getTime()
  ) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  public getId(): string {
    return this.id
  }

  public getCreatedAt(): number {
    return this.createdAt
  }

  public getUpdatedAt(): number {
    return this.updatedAt
  }

  public setUpdatedAt(updatedAt: number): void {
    this.updatedAt = updatedAt
  }
}