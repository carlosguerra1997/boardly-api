export class ClientError extends Error {
  constructor(message: string = 'Client error') {
    super(message)
  }
}