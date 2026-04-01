import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
  details?: Array<{ field?: string; message: string }>;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || [];

  console.error('[Error]', {
    status,
    message,
    details,
    stack: err.stack
  });

  if (details.length > 0) {
    return res.status(status).json({
      error: message,
      details
    });
  }

  res.status(status).json({
    error: message
  });
};