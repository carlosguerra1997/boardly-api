import { FilterType, ListFilter } from '@/common/domain/identity/list/list-filter'
import { ListSort } from '@/common/domain/identity/list/list-sort'
import { ListQueryPayload } from '@/common/domain/identity/list/list-query-payload'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_LIMIT = 20

type QueryParams = Record<string, any> & ListQueryPayload

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
    this.sort = new Map<string, any>()
  }

  public static parse(payload: QueryParams, mapping: Record<string, any> = {}): ListQuery {
    const {
      page = DEFAULT_PAGE, 
      limit = DEFAULT_PAGE_LIMIT
    } = payload

    const query = new ListQuery(Number(page), Number(limit))

    Object.keys(mapping)
      .filter(name => !!payload[name])
      .forEach(name => {
        const filterName = mapping[name]
        const filterValue = payload[name]
        const filter = new ListFilter(filterName, filterValue, FilterType.LIKE)
        query.add(filter)
      })

    console.log({ query })
    return query
  }

  private add(field: ListFilter | ListSort): void {
    if (field instanceof ListFilter) {
      if (field.isValid()) {
        this.filters.set(field.name, field)
      }
    }

    if (field instanceof ListSort) {
      // check isValid
      this.sort.set(field.name, field)
    }
  }
}