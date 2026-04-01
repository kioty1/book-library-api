import { Publisher } from '../models/publisher.model';

export const publishers: Publisher[] = [
  {
    id: 'publisher-1',
    name: 'Bloomsbury',
    country: 'United Kingdom',
    foundedYear: 1986,
    website: 'https://www.bloomsbury.com',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'publisher-2',
    name: 'Penguin Books',
    country: 'United Kingdom',
    foundedYear: 1935,
    website: 'https://www.penguin.co.uk',
    createdAt: new Date('2024-01-02')
  },
  {
    id: 'publisher-3',
    name: 'HarperCollins',
    country: 'United States',
    foundedYear: 1989,
    website: 'https://www.harpercollins.com',
    createdAt: new Date('2024-01-03')
  }
];