export enum BoardStatusEnum {
  ACTIVE = 'active',
  ARCHIVED = 'archived'
}

export class BoardStatus {
  private status: BoardStatusEnum

  constructor(status: BoardStatusEnum) {
    this.status = status
  }

  isActive(): boolean {
    return this.status === BoardStatusEnum.ACTIVE
  }

  isArchived(): boolean {
    return this.status === BoardStatusEnum.ARCHIVED
  }

  getStatus(): string {
    return this.status
  }
}