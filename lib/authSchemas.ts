import { z } from "zod";

export const passwordRequirements =
  "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.";
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/;

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name is required")
    .max(10, "First name is too long")
    .regex(
      /^[A-Za-z'-]+$/,
      "First name must only contain letters, apostrophes, or hyphens"
    ),
  lastName: z
    .string()
    .min(2, "Last name is required")
    .max(10, "Last name is too long")
    .regex(
      /^[A-Za-z'-]+$/,
      "Last name must only contain letters, apostrophes, or hyphens"
    ),
  address1: z
    .string()
    .min(5, "Address is required")
    .max(50, "Address is too long"),

  city: z.string().min(2, "City is required").max(20, "City is too long"),

  state: z
    .string()
    .length(2, "State must be a 2-letter code")
    .regex(/^[A-Z]{2}$/, "State must be a valid 2-letter code (e.g., NY)"),
  postalCode: z
    .string()
    .regex(
      /^[0-9]{5}(-[0-9]{4})?$/,
      "Postal code must be valid (e.g., 12345 or 12345-6789)"
    ),
  dateOfBirth: z.string().refine((date) => {
    // Accept both YYYY-MM-DD and MM/DD/YYYY
    const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const usMatch = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    let dob;
    if (isoMatch) {
      dob = new Date(date);
    } else if (usMatch) {
      const [month, day, year] = date.split("/");
      dob = new Date(`${year}-${month}-${day}`);
    } else {
      return false;
    }
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();
    const m = now.getMonth() - dob.getMonth();
    return age > 18 || (age === 18 && m >= 0 && now.getDate() >= dob.getDate());
  }, "You must be at least 18 years old"),
  ssn: z
    .string()
    .regex(
      /^(?!000|666|9\d\d)\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/,
      "SSN must be valid (e.g., 123-45-6789)"
    ),
  email: z.string().email("Invalid email format"),
  password: z.string(),
});
