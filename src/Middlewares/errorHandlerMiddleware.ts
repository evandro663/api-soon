import { NextFunction, Request, Response } from 'express';

const errors: Record<string, number> = {
  ValidationError: 400,
  UnauthorizedError: 401,
  NotFoundError: 404,
  SequelizeUniqueConstraintError: 409,
  DataBaseError: 500
};

const errorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const status = errors[err.name];
  const { message } = err;
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

export default errorHandlerMiddleware;
