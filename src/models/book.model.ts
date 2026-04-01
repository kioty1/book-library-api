export interface Book {
  id: string;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description: string;
  coverImage?: string;

  authorId: string;
  publisherId: string;

  genres: string[];

  createdAt: Date;
  updatedAt: Date;
}