import express, { Request, Response } from 'express';
import booksRoutes from './routes/books.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Book Library API is running'
  });
});

app.use('/api/v1/books', booksRoutes);

// Error handler middleware - must be last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});