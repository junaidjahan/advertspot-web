import { z } from 'zod';

export const jobSchema = z.object({
  Title: z.string().min(1, 'This field is required'),
  Quantity: z.string().min(1, 'This field is required'),
  Dimensions: z.string().min(1, 'This field is required'),
  Budget: z.string().min(1, 'This field is required'),
  Description: z.string(),
  Location: z.string().min(1, 'This field is required'),
  Type: z.string().min(1, 'This field is required')
});

export const jobFilterSchema = z.object({
  title: z.string(),
  category: z.string()
});
