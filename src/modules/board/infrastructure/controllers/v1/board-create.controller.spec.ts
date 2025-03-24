import { BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BoardCreateUseCase } from '@/modules/board/application/creator/board-create-use-case'
import { BoardCreateController } from '@/modules/board/infrastructure/controllers/v1/board-create.controller'

import { BoardRepositoryStub } from '@/tests/doubles/persistence/board-repository-stub'
import { IdGeneratorStub } from '@/tests/doubles/common/id-generator-stub'

import { BoardPayloadMother } from '@/tests/mothers/board-payload-mother'
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
    const payload = BoardPayloadMother.create()
    const result = await controller.invoke(payload, requestFixture)

    expect(result.message).toBe('success')
    expect(repo.stored).not.toBeUndefined()
    expect(repo.stored?.getName()).toBe('Testing board')
    expect(repo.stored?.getDescription()).toBe('This is a testing board')
    expect(repo.stored?.getStatus().getValue()).toBe('active')
  })

  it('Should return the created Board', async () => {
    const payload = BoardPayloadMother.create()

    const result = await controller.invoke(payload, requestFixture)
    expect(result.data.id).toBe('mocked-id')
    expect(result.data.name).toBe('Testing board')
    expect(result.data.status).toBe('active')
  })

  it('Should call BoardCreateUseCase only once', async () => {
    const payload = BoardPayloadMother.create()
    const spy = vi.spyOn(creator, 'dispatch')

    await controller.invoke(payload, requestFixture)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should throw BadRequestException when name is empty', async () => {
    const payload = BoardPayloadMother.withEmptyName()

    await controller
      .invoke(payload, requestFixture)
      .catch(error => {
        expect(error).toBeInstanceOf(BadRequestException)
        expect(error.message).toBe('Board name is required')
      })
  })

  it('Should throw BadRequestException when name is only spaces', async () => {
    const payload = BoardPayloadMother.create({ name: '   ' })

    await controller
      .invoke(payload, requestFixture)
      .catch(error => {
        expect(error).toBeInstanceOf(BadRequestException)
        expect(error.message).toBe('Board name is required')
      })
  })

  it('Should throw InternalServerException when unexpected error', async () => {
    repo.error = 'Unexpected error'
    const payload = BoardPayloadMother.create()

    await controller
      .invoke(payload, requestFixture)
      .catch(error => {
        expect(error).toBeInstanceOf(InternalServerErrorException)
        expect(error.message).toBe('Internal Server Error')
      })
  })
})