import { BoardInvalidVisibility } from '@/modules/board/domain/exception/board-invalid-visibility'

export type BoardVisibilityType = 'public' | 'private'

export class BoardVisibility {
  private readonly visibility: BoardVisibilityType

  private readonly PUBLIC_VISIBILITY = 'public'
  private readonly PRIVATE_VISIBILITY = 'private'

  constructor(visibility: BoardVisibilityType) {
    this.isValidVisibility(visibility)
    this.visibility = visibility
  }

  private isValidVisibility(visibility: BoardVisibilityType): void {
    const isValid = 
      visibility === this.PUBLIC_VISIBILITY ||
      visibility === this.PRIVATE_VISIBILITY

    if (!isValid) {
      throw new BoardInvalidVisibility()
    }
  }

  public getVisibility(): BoardVisibilityType {
    return this.visibility
  }

  public isPublic(): boolean {
    return this.visibility === this.PUBLIC_VISIBILITY
  }

  public isPrivate(): boolean {
    return this.visibility === this.PRIVATE_VISIBILITY
  }
}