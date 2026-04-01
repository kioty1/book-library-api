import { Review } from '../models/review.model';

export const reviews: Review[] = [
  {
    id: 'review-1',
    bookId: 'book-1',
    userName: 'Alice',
    rating: 5,
    comment: 'Amazing start to the series.',
    createdAt: new Date('2024-03-01')
  },
  {
    id: 'review-2',
    bookId: 'book-1',
    userName: 'Bob',
    rating: 4,
    comment: 'Very enjoyable and magical.',
    createdAt: new Date('2024-03-02')
  },
  {
    id: 'review-3',
    bookId: 'book-3',
    userName: 'Clara',
    rating: 5,
    comment: 'A powerful and timeless novel.',
    createdAt: new Date('2024-03-03')
  },
  {
    id: 'review-4',
    bookId: 'book-3',
    userName: 'David',
    rating: 4,
    comment: 'Very thought-provoking.',
    createdAt: new Date('2024-03-04')
  },
  {
    id: 'review-5',
    bookId: 'book-4',
    userName: 'Eva',
    rating: 4,
    comment: 'Short but meaningful.',
    createdAt: new Date('2024-03-05')
  },
  {
    id: 'review-6',
    bookId: 'book-5',
    userName: 'Frank',
    rating: 5,
    comment: 'A classic I always enjoy.',
    createdAt: new Date('2024-03-06')
  },
  {
    id: 'review-7',
    bookId: 'book-7',
    userName: 'Grace',
    rating: 5,
    comment: 'Wonderful adventure story.',
    createdAt: new Date('2024-03-07')
  },
  {
    id: 'review-8',
    bookId: 'book-8',
    userName: 'Henry',
    rating: 5,
    comment: 'Epic and unforgettable.',
    createdAt: new Date('2024-03-08')
  },
  {
    id: 'review-9',
    bookId: 'book-9',
    userName: 'Isabella',
    rating: 4,
    comment: 'Inspirational and easy to read.',
    createdAt: new Date('2024-03-09')
  },
  {
    id: 'review-10',
    bookId: 'book-10',
    userName: 'Jack',
    rating: 3,
    comment: 'Interesting themes, but not my favorite.',
    createdAt: new Date('2024-03-10')
  }
];