export interface Publisher {
  id: string;
  name: string;
  country: string;
  foundedYear: number;
  website?: string;
  createdAt: Date;
}