import { InternalServerErrorException } from '@nestjs/common'
import { beforeEach, describe, expect, it } from 'vitest'

import { BoardListUseCase } from '@/modules/board/application/lister/board-list-use-case'

import { BoardRepositoryStub } from '@/tests/doubles/persistence/board-repository-stub'
import { BoardListController } from '@/modules/board/infrastructure/controllers/v1/board-list.controller'

describe('Board list controller test suite', () => {
  let repo: BoardRepositoryStub
  let lister: BoardListUseCase
  let controller: BoardListController

  beforeEach(() => {
    repo = new BoardRepositoryStub()
    lister = new BoardListUseCase(repo)
    controller = new BoardListController(lister)
  })

  it ('Should list all boards', async () => {
    repo.all()

    const result = await controller.invoke({})
    
    expect(result.message).toBe('success')
    expect(result.data).toHaveLength(2)
  })

  it('Should return boards sorted by default sort field', async () => {
    repo.all()

    const result = await controller.invoke({})

    expect(result.message).toBe('success')
    expect(result.data).toHaveLength(2)
    expect(result.data[0].name).toBe('Testing board 1')
    expect(repo.query?.sort.size).toBe(1)
    expect(repo.query?.sort.get('createdAt')).toBeDefined()
  })

  it('Should return boards sorted by name asc', async () => {
    repo.all()

    const result = await controller.invoke({ sort: 'name:asc' })

    expect(result.message).toBe('success')
    expect(result.data).toHaveLength(2)
    expect(result.data[0].name).toBe('Testing board 1')
    expect(repo.query?.sort.size).toBe(1)
    expect(repo.query?.sort.get('name')).toBeDefined()
  })

  it('Should return boards filtered by status', async () => {
    repo.all()

    const result = await controller.invoke({ status: 'active' })

    expect(result.message).toBe('success')
    expect(result.data).toHaveLength(1)
    expect(result.data[0].name).toBe('Testing board 1')
    expect(repo.query?.filters.size).toBe(1)
    expect(repo.query?.filters.get('status')).toBeDefined()
  })

  it('Should return boards filtered by visibility', async () => {
    repo.all()

    const result = await controller.invoke({ visibility: 'private' })

    expect(result.message).toBe('success')
    expect(result.data).toHaveLength(2)
    expect(result.data[0].name).toBe('Testing board 1')
    expect(repo.query?.filters.size).toBe(1)
    expect(repo.query?.filters.get('visibility')).toBeDefined()
  })

  it('Should return boards filtered by status and visibility', async () => {
    repo.all()

    const result = await controller.invoke({ status: 'active', visibility: 'private' })

    expect(result.message).toBe('success')
    expect(result.data).toHaveLength(1)
    expect(result.data[0].name).toBe('Testing board 1')
    expect(repo.query?.filters.size).toBe(2)
  })

  it('Should throw InternalServerException when unexpected error', async () => {
    repo.error = 'Unexpected error'

    await controller
      .invoke({})
      .catch(error => {
        expect(error).toBeInstanceOf(InternalServerErrorException)
        expect(error.message).toBe('Internal Server Error')
      })
  })
})