import { z } from "zod";

export const userAddSchema = z.object({
    name: z.string().min(1, { message: "Please fill your name" }),
    email: z.string().email({ message: "Please fill valid email." }),
    password: z
        .string()
        .min(6, { message: "Password must be atleast 6 letters" })
        .max(30),
    contact: z
        .string()
        .min(7, { message: "Contact must be atleast 7 letters" }),
    address: z.string().min(1, { message: "Please fill your address" })
});

export const userSchema = userAddSchema.partial({
    password: true
});

const userUpdateSchema = z.object({
    id: z.string(),
    name: z.string(),
    contact: z.string(),
    address: z.string()
});

const userDatabaseSchema = userUpdateSchema.extend({
    email: z.string().email()
});

export type userDatabaseType = z.infer<typeof userDatabaseSchema>;
export type userUpdateType = z.infer<typeof userUpdateSchema>;

export type UserAddType = z.infer<typeof userSchema>;
