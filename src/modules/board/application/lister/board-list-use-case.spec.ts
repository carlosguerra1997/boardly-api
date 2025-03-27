import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BoardListUseCase } from '@/modules/board/application/lister/board-list-use-case'

import { BoardRepositoryStub } from '@/tests/doubles/persistence/board-repository-stub'
import { ListQuery } from '@/common/domain/identity/list/list-query'

describe('board-list-use-case test suite', () => {
  let repo: BoardRepositoryStub
  let lister: BoardListUseCase

  beforeEach(() => {
    repo = new BoardRepositoryStub()
    lister = new BoardListUseCase(repo)
  })

  it('Should call the repository with the parsed ListQuery', async () => {
    vi.spyOn(repo, 'obtainByQuery')

    const query = { status: 'active' }
    await lister.dispatch(query)

    expect(repo.obtainByQuery).toHaveBeenCalledOnce()
    expect(repo.obtainByQuery).toHaveBeenCalledWith(ListQuery.parse(query, lister['mapping']))
  })

  it('Should return a list of boards if query params are not provided', async () => {
    repo.all()

    const payload = {}
    const result = await lister.dispatch(payload)

    expect(result).toHaveLength(2)
  })

  it('Should return a list of boards that match the query', async () => {
    repo.all()

    const payload = { status: 'active', visibility: 'private' }
    const result = await lister.dispatch(payload)

    expect(result).toHaveLength(1)
    expect(result[0].getStatus().getValue()).toBe('active')
    expect(result[0].getVisibility().getValue()).toBe('private')
  })

  it('Should return an empty list if no boards match the query', async () => {
    repo.all()

    const payload = { status: 'active', visibility: 'public' }
    const result = await lister.dispatch(payload)

    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })

  it('Should return the list sorted desc by default field if no sort param is provided', async () => {
    repo.all()

    const payload = {}
    const result = await lister.dispatch(payload)

    expect(result[0].getId()).toBe('board-id-1')
    expect(result[1].getId()).toBe('board-id-2')
  })

  it('Should return the list sorted by name:asc', async () => {
    repo.all()

    const payload = { sort: 'name:asc' }
    const result = await lister.dispatch(payload)

    expect(result[0].getId()).toBe('board-id-1')
    expect(result[1].getId()).toBe('board-id-2')
  })
})