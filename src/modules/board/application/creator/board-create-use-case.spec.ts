import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BoardStatus } from '@/modules/board/domain/board-status'
import { BoardVisibility } from '@/modules/board/domain/board-visibility'

import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'

import { IdGeneratorStub } from '@/tests/doubles/common/id-generator-stub'
import { BoardRepositoryStub } from '@/tests/doubles/persistence/board-repository-stub'
import { BoardPayloadMother } from '@/tests/mothers/board-payload-mother'

describe('Board create use case test suite', () => {
  let idGenerator: IdGeneratorStub

  let creator: BoardCreateUseCase
  let repo: BoardRepositoryStub

  beforeEach(() => {
    idGenerator = new IdGeneratorStub()

    repo = new BoardRepositoryStub()
    creator = new BoardCreateUseCase(idGenerator, repo)
  })

  it('Should call ID generator service correctly', async () => {
    const payload = BoardPayloadMother.create()
    vi.spyOn(idGenerator, 'generate')

    const userId = 'test-id'
    await creator.dispatch(payload, userId)

    expect(idGenerator.generate).toHaveBeenCalledOnce()
  })

  it('Should create a board successfully', async () => {
    const payload = BoardPayloadMother.create()
    vi.spyOn(repo, 'save')

    const board = await creator.dispatch(payload, 'test-id')

    expect(repo.save).toHaveBeenCalledWith(board)
    expect(board.getId()).toBe('mocked-id')
    expect(board.getName()).toBe('Testing board')
    expect(board.getDescription()).toBe('This is a testing board')
  })

  it('Should create a board with correct visibility and status', async () => {
    const payload = BoardPayloadMother.create()

    const board = await creator.dispatch(payload, 'test-id')

    expect(board.getStatus()).toBeInstanceOf(BoardStatus)
    expect(board.getVisibility()).toBeInstanceOf(BoardVisibility)
    expect(board.getStatus().getValue()).toBe('active')
    expect(board.getVisibility().getValue()).toBe('private')
  })
})