import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import HttpError, { IHttpError } from './http-error';

const DEFAULT_ERROR = new HttpError(
  INTERNAL_SERVER_ERROR,
  'Something went wrong'
);

const errorHandler = (
  err: IHttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const error = err.status ? err : DEFAULT_ERROR;
  return res.status(error.status).json({ message: error.message });
};

export default errorHandler;
