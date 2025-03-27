import { DataTransform } from '@/common/domain/identity/data-transform'
import { FilterType, ListFilter } from '@/common/domain/identity/list/list-filter'
import { ListSort } from '@/common/domain/identity/list/list-sort'
import { ListQueryPayload } from '@/common/domain/identity/list/list-query-payload'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_LIMIT = 20
const DEFAULT_SORT_PARAM = 'createdAt'

export type QueryParams = Record<string, any> & ListQueryPayload

export class ListQuery {
  public filters: Map<string, ListFilter>
  public sort: Map<string, ListSort>

  constructor (
    public page: number = DEFAULT_PAGE,
    public limit: number = DEFAULT_PAGE_LIMIT
  ) {
    if (this.page < DEFAULT_PAGE) {
      this.page = DEFAULT_PAGE
    }

    if (this.limit <= 0) {
      this.limit = DEFAULT_PAGE_LIMIT
    }

    this.filters = new Map<string, ListFilter>()
    this.sort = new Map<string, ListSort>()
  }

  public static parse(payload: QueryParams, mapping: Record<string, any> = {}): ListQuery {
    const transformer = new DataTransform()

    const page = transformer.toInt(payload.page, DEFAULT_PAGE)
    const limit = transformer.toInt(payload.limit, DEFAULT_PAGE_LIMIT)
    
    const query = new ListQuery(page, limit)

    query.mapFilters(payload, mapping)

    const sortValue = transformer.toString(payload.sort)
    if (sortValue !== null && !transformer.isEmpty(sortValue)) {
      query.mapSort(sortValue)
    }

    if (!query.hasSort()) {
      query.sortByDefault()
    }

    return query
  }

  private mapSort(sortValue: string) {
    sortValue
      .split('|')
      .forEach(value => {
        const field = ListSort.parse(value)
        this.add(field)
      })
  }

  private mapFilters(payload: QueryParams, mapping: Record<string, any>) {
    Object.keys(mapping)
      .filter(name => !!payload[name])
      .forEach(name => {
        const filterName = mapping[name]
        const filterValue = payload[name]
        const filter = new ListFilter(filterName, filterValue, FilterType.LIKE)
        this.add(filter)
      })
  }

  public add(field: ListFilter | ListSort): void {
    if (field instanceof ListFilter) {
      if (field.isValid()) {
        this.filters.set(field.name, field)
      }
    }

    if (field instanceof ListSort) {
      if (field.isValid()) {
        this.sort.set(field.name, field)        
      }
    }
  }

  public sortByDefault(): void {
    if (this.hasSort()) {
      return
    }

    this.add(ListSort.desc(DEFAULT_SORT_PARAM))
  }

  public hasFilters(): boolean {
    return this.filters.size > 0
  }

  public hasSort(): boolean {
    return this.sort.size > 0
  }

  public offset(): number {
    return (this.page - DEFAULT_PAGE) * this.limit
  }
}