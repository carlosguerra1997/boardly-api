import { z } from 'zod'

export const registerPayloadSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username should have at least 3 characters' }),
  email: z
    .string()
    .email('Invalid email'),
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Psasword should have at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Psasword should have at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Psasword should have at least one number' })
    .regex(/[A-Z]/, { message: 'Psasword should have at least one symbols' }),
  confirmedPassword: z
    .string()
}).refine((data) => data.password === data.confirmedPassword, {
  message: 'Passwords does not match',
  path: ['confirmedPassword']
})

export type RegisterPayload = z.infer<typeof registerPayloadSchema>