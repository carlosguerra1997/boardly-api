import { z } from 'zod'

import { boardCreatePayloadValidationSchema } from '@/modules/board/application/creator/board-create-payload'

export const boardUpatePayloadValidationSchema = boardCreatePayloadValidationSchema.merge(
  z.object({
    status: z
      .enum(['active', 'archived'], { message: 'Board status should be either active or archived' })
  })
)

export type BoardUpdatePayload = z.infer<typeof boardUpatePayloadValidationSchema>