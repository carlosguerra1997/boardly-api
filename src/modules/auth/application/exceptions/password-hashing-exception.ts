import { HashingError } from "@/common/domain/identity/exception/hashing-error";

export class PasswordHashingException extends HashingError {
  constructor(message: string = 'There was an error hashing the password') {
    super(message)
    this.name = 'PasswordHashingException'
  }
}