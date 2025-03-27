import { beforeAll, describe, expect, it } from 'vitest'

import { DataTransform } from '@/common/domain/identity/data-transform'

describe('data-transform test suite', () => {
  let transform: DataTransform

  beforeAll(() => {
    transform = new DataTransform()
  })

  it('Should to string', () => {
    expect(transform.toString(null)).toBe('')
    expect(transform.toString(null, null)).toBe(null)
    expect(transform.toString(undefined)).toBe('')
    expect(transform.toString(undefined, 'default value')).toBe('default value')
    expect(transform.toString(false)).toBe('false')
    expect(transform.toString(true)).toBe('true')
    expect(transform.toString(1)).toBe('1')
    expect(transform.toString('dummy')).toBe('dummy')
    expect(transform.toString([])).toBe('')
  })

  it('Should to int', () => {
    expect(transform.toInt(null)).toBe(0)
    expect(transform.toInt(null, 5)).toBe(5)
    expect(transform.toInt(undefined)).toBe(0)
    expect(transform.toInt(false)).toBe(0)
    expect(transform.toInt(true)).toBe(1)
    expect(transform.toInt('1')).toBe(1)
    expect(transform.toInt(1)).toBe(1)
    expect(transform.toInt(1.32)).toBe(1)
    expect(transform.toInt('dummy')).toBe(0)
    expect(transform.toInt([])).toBe(0)
  })

  it('Should be empty', () => {
    expect(transform.isEmpty('')).toBeTruthy()
    expect(transform.isEmpty(null)).toBeTruthy()
  
  })

  it('Should not be empty', () => {
    expect(transform.isEmpty('test')).toBeFalsy()
  })
})