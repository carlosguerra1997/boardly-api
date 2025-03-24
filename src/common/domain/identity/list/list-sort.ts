export class ListSort {
  private readonly asc = 'asc'
  private readonly desc = 'desc'

  public name: string
  public order: string

  constructor(
    name: string,
    order: string
  ) {
    this.name = name
    this.order = this.isValidOrder(order) ? order.toLowerCase() : this.asc
  }

  public static parse(value: string): ListSort {
    const [
      name, 
      order
    ] = value.split(/[;:]/)

    return new  ListSort(name, order)
  }

  public static desc(name: string): ListSort {
    return new ListSort(name, 'desc')
  }

  public isValid(): boolean {
    return this.name !== ''
  }

  private isValidOrder(order: string): boolean {
    const orderToLower = order.toLocaleLowerCase()
    return orderToLower === this.asc || orderToLower === this.desc
  }
}