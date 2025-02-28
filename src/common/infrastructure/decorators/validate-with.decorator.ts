import { applyDecorators, UsePipes } from '@nestjs/common'
import { ZodSchema } from 'zod'

import { ZodValidationPipe } from '@/common/infrastructure/pipes/zod-validation-pipe'

export function ValidateWith(schema: ZodSchema) {
  return applyDecorators(UsePipes(new ZodValidationPipe(schema)))
}