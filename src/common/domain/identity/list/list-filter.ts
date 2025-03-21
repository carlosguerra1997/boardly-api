export enum FilterType {
  EQUAL = 'equal',
  LIKE = 'like'
}

export class ListFilter {
  constructor(
    public name: string,
    public value: string,
    public type: FilterType = FilterType.EQUAL
  ) {}

  public static equal(name: string, value: string): ListFilter {
    return new ListFilter(name, value, FilterType.EQUAL)
  }

  public static like(name: string, value: string): ListFilter {
    return new ListFilter(name, value, FilterType.LIKE)
  }

  public isValid(): boolean {
    return this.name !== '' && this.value !== ''
  }
}