export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  birthYear: number;
  nationality: string;
  biography?: string;
  createdAt: Date;
}