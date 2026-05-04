import * as z from 'zod'

export const createProfileSchema = z.object({
  name: z
    .string('Name must be a string')
    .trim()
    .min(2, 'Too short.')
    .max(20, 'Cmon man, your name can\'t be that long...'),
  bio: z
    .string()
    .trim()
    .min(10, 'Don\'t be shy. Tell us more about you.')
    .max(250, 'People ain\'t gonna read this... make it shorter.'),
})

export type CreateProfileInput = z.infer<typeof createProfileSchema>
