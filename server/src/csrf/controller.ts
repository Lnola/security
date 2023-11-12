import { Request, Response, NextFunction } from 'express';
import { FORBIDDEN, OK } from 'http-status';
import db from '../shared/database';
import initializeAdmin from '../shared/database/initialization/admin';
import HttpError from 'shared/error/http-error';

type VerifyPasswordDto = {
  username: string;
  password: string;
};

const queries = {
  getUserByUsernameAndPassword: ({ username, password }: VerifyPasswordDto) => {
    return db.query(
      'SELECT username, password FROM admin WHERE username = $1 AND password = $2;',
      [username, password]
    );
  },
};

export const updatePasswordVulnarable = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.json(OK);
};

export const updatePasswordSecure = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.json(OK);
};

export const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dto = req.query as VerifyPasswordDto;
  const user = (await queries.getUserByUsernameAndPassword(dto)).rows[0];
  if (!user) {
    return next(new HttpError(FORBIDDEN, 'Invalid username or password!'));
  }
  return res.json(OK);
};

export const resetAdminTable = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const wasInitialized = await initializeAdmin(true);
  if (!wasInitialized) return next(new Error());
  return res.json(OK);
};
