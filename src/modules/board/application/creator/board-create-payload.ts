import { z } from 'zod'

export const boardCreatePayloadValidationSchema = z.object({
  name: z
    .string({ message: 'Name not valid' })
    .nonempty({ message: 'Name cannot be empty' }),
  description: z
    .string({ message: 'Description not valid' })
    .optional(),
  visibility: z
    .enum(['public', 'private'], { message: 'Board visibility should be either public or private' })
})

export type BoardCreatePayload = z.infer<typeof boardCreatePayloadValidationSchema>