import { z } from 'zod'

export const boardCreateValidationPayloadSchema = z.object({
  name: z
    .string()
    .min(1),
  description: z
    .string()
    .optional(),
  visibility: z
    .enum(['public', 'private'], { message: 'Board visibility should be either public or private' })
})

const _boardCreatePayloadType = boardCreateValidationPayloadSchema.shape

export type BoardCreatePayload = {
  [K in keyof typeof _boardCreatePayloadType]: z.infer<typeof _boardCreatePayloadType[K]>
}