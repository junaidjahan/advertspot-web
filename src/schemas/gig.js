import { z } from 'zod';

export const gigSchema = z.object({
  title: z.string().min(1, 'This field is required'),
  description: z.string(),
  price: z.any(),
  quantity: z.any(),
  delivery: z.any(),
  duration: z.any(),
  Image: z.any(),
  category: z.string().min(1, 'This field is required'),
  height: z.any(),
  width: z.any(),
  unit: z.any()
});
