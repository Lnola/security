import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, FORBIDDEN, OK } from 'http-status';
import { v4 as uuid } from 'uuid';
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

let csrf_token: string;

const regenerateToken = () => {
  csrf_token = uuid();
  return csrf_token;
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

// in a real use case this method would require further safety measures
export const getToken = (_req: Request, res: Response) => {
  const token = regenerateToken();
  return res.json(token);
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
    const { token } = req.body;
    if (!token || token !== csrf_token) {
      return next(new HttpError(FORBIDDEN, 'CSRF attack!'));
    }
    const newToken = regenerateToken();
    const { username, newPassword } = req.body;
    if (!username || !newPassword) {
      return next(new HttpError(BAD_REQUEST, 'Missing params!'));
    }
    await queries.updatePassword({ username, newPassword });
    return res.json(newToken);
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
