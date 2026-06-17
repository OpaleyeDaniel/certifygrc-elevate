import { z } from "zod";

export const waitlistSourceSchema = z.enum(["landing", "application"]);

export const waitlistFormSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(120, "Name is too long")
      .refine((s) => !/[<>]/.test(s), "Name contains invalid characters"),
    email: z
      .string()
      .trim()
      .min(1, "Enter a valid email address")
      .email("Enter a valid email address")
      .max(254, "Email is too long")
      .transform((s) => s.toLowerCase()),
    source: waitlistSourceSchema,
    /** Honeypot — must stay empty (bots often fill hidden fields). */
    _gotcha: z.string().max(200).optional(),
  })
  /** Honeypot filled — usually password manager / autofill on a hidden field; message is user-safe. */
  .refine((d) => !d._gotcha?.trim(), {
    message: "Something interfered with the form. Refresh the page and try again—or turn off autofill for this site.",
  })
  .transform(({ _gotcha: _discard, ...rest }) => rest);

/** Validated + normalized shape (email lowercased, honeypot stripped). */
export type WaitlistFormInput = z.infer<typeof waitlistFormSchema>;

/** Wire payload accepted from the browser (includes optional honeypot). */
export type WaitlistRequestBody = z.input<typeof waitlistFormSchema>;
