export type BoardStatusType = 'active' | 'archived'

export class BoardStatus {
  private readonly ACTIVE_STATUS = 'active'
  private readonly ARCHIVED_STATUS = 'archived'
  
  private status: BoardStatusType

  constructor(status: BoardStatusType) {
    this.status = status
  }

  getValue(): BoardStatusType {
    return this.status
  }

  isActive(): boolean {
    return this.status === this.ACTIVE_STATUS
  }

  isArchived(): boolean {
    return this.status === this.ARCHIVED_STATUS
  }
}