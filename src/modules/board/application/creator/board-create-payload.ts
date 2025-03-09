import { z } from 'zod'

export const boardPayloadValidationSchema = z.object({
  name: z
    .string({ message: 'Name not valid' })
    .nonempty({ message: 'Name cannot be empty' }),
  description: z
    .string({ message: 'Description not valid' })
})

export type BoardCreatePayload = z.infer<typeof boardPayloadValidationSchema>