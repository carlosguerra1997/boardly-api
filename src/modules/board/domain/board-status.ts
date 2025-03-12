export type BoardStatusType = 'active' | 'archived'

export class BoardStatus {
  private static readonly ACTIVE_STATUS = 'active'
  private static readonly ARCHIVED_STATUS = 'archived'

  private status: BoardStatusType

  constructor(status: BoardStatusType) {
    this.status = status
  }

  isActive(): boolean {
    return this.status === BoardStatus.ACTIVE_STATUS
  }

  isArchived(): boolean {
    return this.status === BoardStatus.ARCHIVED_STATUS
  }

  getStatus(): BoardStatusType {
    return this.status
  }
}