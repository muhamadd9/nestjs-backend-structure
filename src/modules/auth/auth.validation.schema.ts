import { z } from 'zod';

export const signupSchema = z
  .object({
    userName: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .strict()
  .superRefine((args, ctx) => {
    if (args.password !== args.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password and confirm password do not match',
      });
    }
  });
