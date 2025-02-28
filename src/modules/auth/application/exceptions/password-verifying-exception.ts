import { HashingError } from "@/common/domain/identity/exception/hashing-error";

export class PasswordVerifyingException extends HashingError {
  constructor(message: string = 'There was an error verifying the password') {
    super(message)
    this.name = 'PasswordVerifyingException'
  }
}