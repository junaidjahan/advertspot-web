import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email must be valid'),
  password: z
    .string()
    .min(8, 'Password must be at-teast 8 characters long')
    .max(36, 'Password must not be greater than 36 characters')
});
