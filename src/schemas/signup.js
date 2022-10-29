import { z } from 'zod';

export const signupSchema = z
  .object({
    firstName: z.string().min(1, 'This field is required'),
    lastName: z.string().min(1, 'This field is required'),
    email: z.string().email('Email must be valid'),
    password: z
      .string()
      .min(8, 'Password must be at-teast 8 characters long')
      .max(36, 'Password must not be greater than 36 characters'),
    confirmPassword: z.string(),
    phoneNumber: z.string(),
    userType: z.string()
  })
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'] // path of error
    }
  );
