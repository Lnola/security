import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, FORBIDDEN, OK } from 'http-status';
import db from '../shared/database';
import initializeAdmin from '../shared/database/initialization/admin';
import HttpError from '../shared/error/http-error';

type UpdatePasswordDto = {
  username: string;
  newPassword: string;
};

type VerifyPasswordDto = {
  username: string;
  password: string;
};

const queries = {
  updatePassword: ({ username, newPassword }: UpdatePasswordDto) => {
    return db.query('UPDATE admin SET password = $1 WHERE username = $2;', [
      newPassword,
      username,
    ]);
  },
  getUserByUsernameAndPassword: ({ username, password }: VerifyPasswordDto) => {
    return db.query(
      'SELECT username, password FROM admin WHERE username = $1 AND password = $2;',
      [username, password]
    );
  },
};

export const updatePasswordVulnarable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, newPassword } = req.body;
    if (!username || !newPassword) {
      return next(new HttpError(BAD_REQUEST, 'Missing params!'));
    }
    await queries.updatePassword({ username, newPassword });
    return res.json(OK);
  } catch (error) {
    console.error(error);
    return next(new Error());
  }
};

export const updatePasswordSecure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, newPassword } = req.body;
    if (!username || !newPassword) {
      return next(new HttpError(BAD_REQUEST, 'Missing params!'));
    }
    await queries.updatePassword({ username, newPassword });
    return res.json(OK);
  } catch (error) {
    console.error(error);
    return next(new Error());
  }
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
