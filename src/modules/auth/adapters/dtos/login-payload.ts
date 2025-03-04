import { z, ZodSchema } from 'zod'

export const loginPayloadSchema = z.object({
  email: z
    .string({ message: 'Email not valid' })
    .email({ message: 'Invalid email' }),
  password: z
    .string({ message: 'Password not valid' })
})

export type LoginPayload = z.infer<typeof loginPayloadSchema>
