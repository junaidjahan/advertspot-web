import { z } from 'zod';

export const jobSchema = z.object({
  Title: z.string().min(1, 'This field is required'),
  Quantity: z.string().min(1, 'This field is required'),
  Budget: z.string().min(1, 'This field is required'),
  Description: z.string(),
  Location: z.string(),
  Type: z.string().min(1, 'This field is required'),
  Delivery: z.string().min(1, 'This field is required'),
  Duration: z.string().min(1, 'This field is required'),
  Height: z.string(),
  Width: z.string(),
  Unit: z.string()
});

export const jobFilterSchema = z.object({
  title: z.string(),
  category: z.string()
});
