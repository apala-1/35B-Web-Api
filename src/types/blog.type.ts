import z from 'zod';

export const BlogType = z.object({
    title: z.string().min(5).max(200),
    content: z.string().min(1),
    authorId: z.string().min(1)
});

export type CreateBlogDTO = z.infer<typeof BlogType>;