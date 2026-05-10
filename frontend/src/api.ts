import axios from "axios";

export interface Book {
  id: string;
  title: string;
  isbn: string;
  publishedYear: number;
  pageCount: number;
  language: string;
  description?: string;

  author?: {
    id: string;
    firstName: string;
    lastName: string;
  };

  publisher?: {
    id: string;
    name: string;
  };

  genres?: {
    id: string;
    name: string;
  }[];
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface GetBooksParams {
  title?: string;
  year?: string;
  language?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BooksResponse {
  data: Book[];
  pagination: Pagination;
}

export interface CreateBookData {
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
}

export const getBooks = async (
  params: GetBooksParams = {}
): Promise<BooksResponse> => {
  const response = await API.get("/books", {
    params: {
      ...params,
      t: Date.now(),
    },
  });

  return response.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await API.get(`/books/${id}?t=${Date.now()}`);
  return response.data.data;
};

export const getBookReviews = async (
  bookId: string
): Promise<Review[]> => {
  const response = await API.get(
    `/books/${bookId}/reviews?t=${Date.now()}`
  );

  return response.data.data;
};

export const getAverageRating = async (
  bookId: string
): Promise<number> => {
  const response = await API.get(
    `/books/${bookId}/average-rating?t=${Date.now()}`
  );

  return response.data.data.averageRating;
};

export const createBook = async (
  bookData: CreateBookData
): Promise<Book> => {
  const response = await API.post("/books", bookData);

  return response.data.data;
};

export const updateBook = async (
  id: string,
  bookData: CreateBookData
): Promise<Book> => {
  const response = await API.put(`/books/${id}`, bookData);

  return response.data.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await API.delete(`/books/${id}`);
};

export interface CreateReviewData {
  userName: string;
  rating: number;
  comment: string;
}

export const createReview = async (
  bookId: string,
  reviewData: CreateReviewData
): Promise<Review> => {
  const response = await API.post(`/books/${bookId}/reviews`, reviewData);
  return response.data.data;
};