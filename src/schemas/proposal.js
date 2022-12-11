import { z } from 'zod';

export const proposalSchema = z.object({
  Amount: z.string().min(1, 'This field is required'),
  CoverLetter: z.string()
});
