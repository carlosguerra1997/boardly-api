import { describe, expect, it } from 'vitest'

import { FilterType, ListFilter } from '@/common/domain/identity/list/list-filter'  

describe('list-filter test suite', () => {
  it('Should create', () => {
    const filter = new ListFilter('dummy', 'dummy123')

    expect(filter.name).toBe('dummy')
    expect(filter.value).toBe('dummy123')
    expect(filter.type).toBe(FilterType.EQUAL)
    expect(filter.isValid).toBeTruthy()
  })

  it('Should not be valid when name is empty', () => {
    const filter = new ListFilter('', 'dummy123')
    expect(filter.isValid()).toBeFalsy()  
  })

  it('Should not be valid when value is empty', () => {
    const filter = new ListFilter('dummy', '')
    expect(filter.isValid()).toBeFalsy()  
  })
})