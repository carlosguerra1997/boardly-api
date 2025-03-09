import { Injectable } from '@nestjs/common'

import { type BoardCreatePayload } from '@/modules/board/application/creator/board-create-payload'

@Injectable()
export class BoardCreateUseCase {
  constructor() {}

  async dispatch(payload: BoardCreatePayload): Promise<any> {
    return 
  }
}