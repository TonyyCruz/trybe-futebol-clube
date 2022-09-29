import { Request, Response, NextFunction } from 'express';
import customError from '../utils/customError';

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { status, message } = err as customError;

  res.status(status || 500).json({ message });
}
