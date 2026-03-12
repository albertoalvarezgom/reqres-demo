import { z } from 'zod';

export const userFormSchema = z.object({
  first_name: z.string().min(1, 'userForm.required').min(2, 'userForm.minLength'),
  last_name: z.string().min(1, 'userForm.required').min(2, 'userForm.minLength'),
  email: z.string().min(1, 'userForm.required').email('userForm.invalidEmail'),
});

export type UserFormData = z.infer<typeof userFormSchema>;
