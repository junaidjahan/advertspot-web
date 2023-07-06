import { z } from 'zod';

export const profileSchema = z.object({
  email: z.string().email('Email must be valid'),
  firstName: z.string().min(1, 'This field is required'),
  lastName: z.string().min(1, 'This field is required'),
  phoneNumber: z.string(),
});
