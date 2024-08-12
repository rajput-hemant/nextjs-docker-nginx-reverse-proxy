import parsePhoneNumber from "libphonenumber-js";
import { z } from "zod";

export const EmailLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
});

export type EmailLogin = z.infer<typeof EmailLoginSchema>;

export const PhoneNumberLoginSchema = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .transform((value, ctx) => {
      const phoneNumber = parsePhoneNumber(value.toString(), {
        defaultCountry: "US",
      });

      if (!phoneNumber?.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid phone number",
        });
        return z.NEVER;
      }

      return phoneNumber.formatInternational();
    }),
});

export type PhoneNumberLogin = z.infer<typeof PhoneNumberLoginSchema>;

export const OTPLoginSchema = z.object({
  otp: z.string().min(6, {
    message: "Please enter a valid OTP",
  }),
});

export type OTPLogin = z.infer<typeof OTPLoginSchema>;
