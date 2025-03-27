export class Result {
  protected static readonly successMessage: string = 'success'
  protected static readonly errorMessage: string = 'error'

  constructor(
    public message: string,
    public data: any = null
  ) {}

  public static success(data: any = []): Result {
    return new Result(Result.successMessage, data)
  }

  public static error(message: string = ''): Result {
    if (!message) {
      message = this.errorMessage
    }

    return new Result(message)
  }
}