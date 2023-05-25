import { z } from "zod";

export const commonTodoSchema = z.object({
    title: z.string().nonempty({
        message: "Title is empty."
    }),
    description: z.string().nonempty({
        message: "Description is empty."
    }),
    dueDate: z.string().nonempty({
        message: "Pick a due Date."
    })
});

const addTodoSchema = commonTodoSchema.extend({
    userId: z.string()
});

const todoDataBaseSchema = commonTodoSchema.extend({
    id: z.string()
});

export type CommonTodoType = z.infer<typeof commonTodoSchema>;
export type AddTodoType = z.infer<typeof addTodoSchema>;
export type TodoDatabaseType = z.infer<typeof todoDataBaseSchema>;
