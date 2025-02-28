import { Injectable } from '@nestjs/common'

import { hash, verify } from 'argon2'

import { PasswordHashingException } from '@/modules/auth/application/exceptions/password-hashing-exception'
import { PasswordVerifyingException } from '@/modules/auth/application/exceptions/password-verifying-exception'

@Injectable()
export class ArgonHasherService {
  async hash(item: string): Promise<string> {
    try {
      const hashedItem = await hash(item)
      return hashedItem
    } catch (error) {
      throw new PasswordHashingException()
    }
  }

  async compare(item: string, hashedItem: string): Promise<boolean> {
    try {
      const matched = await verify(hashedItem, item)
      return matched
    } catch (error) {
      throw new PasswordVerifyingException()
    }
  }
}