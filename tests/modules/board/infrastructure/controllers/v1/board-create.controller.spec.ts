import { beforeEach, describe, expect, it } from 'vitest'

import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'
import { BoardCreateController } from '@/modules/board/infrastructure/controllers/v1/board-create.controller'

import { BoardRepositoryStub } from '@/tests/doubles/persistence/board-repository-stub'
import { IdGeneratorStub } from '@/tests/doubles/common/id-generator-stub'

import { boardPayloadFixture } from '@/tests/fixtures/board-payload-fixture'
import { requestFixture } from '@/tests/fixtures/request-fixture'

describe('Board create controller test suite', () => {
  let idGenerator: IdGeneratorStub

  let repo: BoardRepositoryStub
  let creator: BoardCreateUseCase
  let controller: BoardCreateController

  beforeEach(() => {
    idGenerator = new IdGeneratorStub()

    repo = new BoardRepositoryStub()
    creator = new BoardCreateUseCase(idGenerator, repo)
    controller = new BoardCreateController(creator)
  })
  
  it('Should create board', async () => {
    const result = await controller.invoke(boardPayloadFixture, requestFixture)

    expect(result.message).toBe('success')
    expect(repo.stored?.getName()).toBe('Testing board')
    expect(repo.stored).not.toBeUndefined()
  })
})