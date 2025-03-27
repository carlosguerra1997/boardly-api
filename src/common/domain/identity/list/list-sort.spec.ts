import { describe, expect, it } from 'vitest'

import { ListSort } from '@/common/domain/identity/list/list-sort'

describe('list-filter test suite', () => {
  it ('Should create', () => {
    const sort = new ListSort('dummy')

    expect(sort.name).toBe('dummy')
    expect(sort.order).toBe('desc')
    expect(sort.isValid()).toBeTruthy()
  })

  it('Should create with desc order if order value is not valid', () => {
    const sort = new ListSort('dummy', 'invalid')

    expect(sort.name).toBe('dummy')
    expect(sort.order).toBe('desc')
    expect(sort.isValid()).toBeTruthy()
  })

  it('Should parse sort value', () => {
    const values = ['id:asc', 'name:desc']
    const sortedFields = values
      .map(value => ListSort.parse(value))
      .map(field => [field.name, field.order])

    const expected = [
      ['id', 'asc'],
      ['name', 'desc']
    ]

    expect(sortedFields).toEqual(expected)
  })

  it('Should create with desc order', () => {
    const sort = ListSort.desc('dummy')

    expect(sort.name).toBe('dummy')
    expect(sort.order).toBe('desc')
    expect(sort.isValid()).toBeTruthy()
  })

  it('Should not be valid when name is empty', () => {
    const sort = new ListSort('')
    expect(sort.isValid()).toBeFalsy()
  })
})