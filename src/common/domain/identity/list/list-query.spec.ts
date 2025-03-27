import { describe, expect, it } from 'vitest'

import { ListFilter } from '@/common/domain/identity/list/list-filter'
import { ListSort } from '@/common/domain/identity/list/list-sort'
import { ListQuery, QueryParams } from '@/common/domain/identity/list/list-query'

describe('list-query test suite', () => {
  it('Should create with default values', () => {
    const query = new ListQuery()

    expect(query.page).toBe(1)
    expect(query.limit).toBe(20)
    expect(query.offset()).toBe(0)
    expect(query.hasFilters()).toBeFalsy()
    expect(query.hasSort()).toBeFalsy()
  })

  it('Should create with default values when invalid fields provided', () => {
    const query = new ListQuery(-1, -1)

    expect(query.page).toBe(1)
    expect(query.limit).toBe(20)
    expect(query.offset()).toBe(0)
    expect(query.hasFilters()).toBeFalsy()
    expect(query.hasSort()).toBeFalsy()
  })

  it('Should run when add a filter', () => {
    const query = new ListQuery()
    const filter = new ListFilter('name', 'dummy')
    query.add(filter)

    expect(query.hasFilters()).toBeTruthy()
    expect(query.filters.has('name')).toBeTruthy()
  })

  it('Should run when add a sort field', () => {
    const query = new ListQuery()
    const sort = new ListSort('name')
    query.add(sort)

    expect(query.hasSort()).toBeTruthy()
    expect(query.sort.has('name')).toBeTruthy()
  })

  it('Should run when sort by default', () => {
    const query = new ListQuery()
    query.sortByDefault()

    const sortField = query.sort.get('createdAt')

    expect(query.hasSort()).toBeTruthy()
    expect(sortField).not.toBeUndefined()
    expect(sortField?.name).toBe('createdAt')
    expect(sortField?.order).toBe('desc')
  })

  it('Should not sort by default when has sort field', () => {
    const query = new ListQuery()
    const sort = new ListSort('name')
    query.add(sort)
    query.sortByDefault()

    const sortField = query.sort.get('name')
    const sortDefaultField = query.sort.get('createdAt')

    expect(query.hasSort()).toBeTruthy()
    expect(sortDefaultField).toBeUndefined()
    expect(sortField).toBeDefined()
    expect(sortField?.name).toBe('name')
    expect(sortField?.order).toBe('desc')
  })

  it('Should parse payload', () => {
    const payload: QueryParams = {
      page: 3,
      limit: 15,
      sort: 'name:desc' 
    }

    const query = ListQuery.parse(payload)

    expect(query.page).toBe(3)
    expect(query.limit).toBe(15)
    expect(query.hasFilters()).toBeFalsy()
    expect(query.hasSort()).toBeTruthy()
    
    const sortField = query.sort.get('name')
    expect(sortField?.name).toBe('name')
    expect(sortField?.order).toBe('desc')
  })

  it('Should parse filters correctly in payload', () => {
    const payload: QueryParams = {
      status: 'dummy'
    }

    const mapping = {
      status: 'status'
    }

    const query = ListQuery.parse(payload, mapping)

    expect(query.page).toBe(1)
    expect(query.limit).toBe(20)
    expect(query.offset()).toBe(0)
    expect(query.hasFilters()).toBeTruthy()

    const filter = query.filters.get('status')
    expect(filter?.value).toBe('dummy')
  })
})