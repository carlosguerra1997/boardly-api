export class HashingError extends Error {
  constructor(message: string = 'Error hashing or verifying password') {
    super(message)
  }
}