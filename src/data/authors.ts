import { Author } from '../models/author.model';

export const authors: Author[] = [
  {
    id: 'author-1',
    firstName: 'J.K.',
    lastName: 'Rowling',
    birthYear: 1965,
    nationality: 'British',
    biography: 'Author of the Harry Potter series.',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'author-2',
    firstName: 'George',
    lastName: 'Orwell',
    birthYear: 1903,
    nationality: 'British',
    biography: 'Known for dystopian novels.',
    createdAt: new Date('2024-01-02')
  },
  {
    id: 'author-3',
    firstName: 'Jane',
    lastName: 'Austen',
    birthYear: 1775,
    nationality: 'British',
    biography: 'Classic English novelist.',
    createdAt: new Date('2024-01-03')
  },
  {
    id: 'author-4',
    firstName: 'J.R.R.',
    lastName: 'Tolkien',
    birthYear: 1892,
    nationality: 'British',
    biography: 'Author of The Lord of the Rings.',
    createdAt: new Date('2024-01-04')
  },
  {
    id: 'author-5',
    firstName: 'Paulo',
    lastName: 'Coelho',
    birthYear: 1947,
    nationality: 'Brazilian',
    biography: 'Author of The Alchemist.',
    createdAt: new Date('2024-01-05')
  }
];