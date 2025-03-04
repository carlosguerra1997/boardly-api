import { ClientError } from '@/common/domain/identity/exception/client-error'

export class RedisClientException extends ClientError {
  constructor(message: string) {
    super(message);
  }
}
