import { z, ZodSchema } from 'zod'

export const loginPayloadSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Psasword should have at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Psasword should have at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Psasword should have at least one number' })
    .regex(/[A-Z]/, { message: 'Psasword should have at least one symbols' })
})