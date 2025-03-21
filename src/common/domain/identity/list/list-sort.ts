export class ListSort {
  private readonly asc = 'asc'
  private readonly desc = 'desc'

  public order: string

  constructor(public name: string) {
    this.order = this.asc
  }

  public sortAsc(): ListSort {
    this.order = this.asc
    return this
  }

  public sortDesc(): ListSort {
    this.order = this.desc
    return this
  }
}