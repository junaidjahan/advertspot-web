import { z } from 'zod';

export const gigSchema = z.object({
  title: z.string().min(1, 'This field is required'),
  description: z.string(),
  price: z.string().min(1, 'This field is required'),
  quantity: z.string().min(1, 'This field is required'),
  delivery: z.string().min(1, 'This field is required'),
  duration: z.string().min(1, 'This field is required'),
  Image: z.any(),
  category: z.string().min(1, 'This field is required'),
  height: z.string(),
  width: z.string(),
  unit: z.string()
});
