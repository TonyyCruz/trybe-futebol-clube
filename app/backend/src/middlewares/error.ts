import { Request, Response, NextFunction } from 'express';
import HttpError from '../shared/HttpError';

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { status, message } = err as HttpError;

  res.status(status || 500).json({ message });
}
