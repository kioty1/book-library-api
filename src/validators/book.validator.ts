import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  publishedYear: z.number().int().positive('Published year must be a positive number'),
  pageCount: z.number().int().positive('Page count must be a positive number'),
  language: z.string().min(1, 'Language is required'),
  description: z.string().min(1, 'Description is required'),
  coverImage: z.string().optional(),
  authorId: z.string().min(1, 'Author ID is required'),
  publisherId: z.string().min(1, 'Publisher ID is required'),
  genres: z.array(z.string()).min(1, 'At least one genre is required')
});

export type CreateBookInput = z.infer<typeof createBookSchema>;