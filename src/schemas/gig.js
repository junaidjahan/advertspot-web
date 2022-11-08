import { z } from 'zod';

export const gigSchema = z.object({
    title: z.string().min(1, 'This field is required'),
    description: z.string().min(1, 'This field is required'),
    price: z.string().min(1, 'This field is required'),
    quantity: z.string().min(1, 'This field is required'),
    delivery: z.string().min(1, 'This field is required'),
    Image:z.any(),
    category: z.string().min(1, 'This field is required'),
    dimensions: z.string().min(1, 'This field is required'),
});
