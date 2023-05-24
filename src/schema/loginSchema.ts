import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Please fill valid email." }),
    password: z
        .string()
        .min(6, { message: "Password must be atleast 6 letters." })
        .max(30)
});

export type LoginDetails = z.infer<typeof loginSchema>;
