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

  public isValid(): boolean {
    return this.name !== '' && this.value !== ''
  }
}