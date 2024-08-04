import {z} from 'zod';
export const formValidation = z.object({
    name: z.string()
        .min(5,"Username must be at least 2 characters.")
        .max(50,"Username must be at most 50 characters."),

    email : z.string().email("Invalid email address")   ,
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
        


  })