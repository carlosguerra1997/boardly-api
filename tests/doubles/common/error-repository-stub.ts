export class ErrorRepositoryStub {
  public error: string = ''

  constructor() {}

  protected throwError(): void {
    if (!this.error) {
      return
    }

    throw new Error(this.error)
  }
}