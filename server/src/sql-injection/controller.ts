import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';
import db from '../shared/database';
import HttpError from '../shared/error/http-error';
import initializeUsers from 'shared/database/initialization/users';
import { ValuesType } from 'utility-types';

const queries = {
  searchVulnarable: (username: unknown) => {
    return db.query(
      `SELECT username, email FROM users WHERE username = '${username}';`
    );
  },
};

const search = async (
  query: ValuesType<typeof queries>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.query;
    if (!username)
      return next(new HttpError(BAD_REQUEST, 'Missing username parameter'));
    const result = await query(username);
    return res.json(result.rows);
  } catch (error) {
    console.log(error);
    return next(new Error());
  }
};

export const searchVulnarable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return search(queries.searchVulnarable, req, res, next);
};

export const searchSecure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('secure');
};

export const resetUsersTable = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const wasInitialized = await initializeUsers();
  if (!wasInitialized) return next(new Error());
  return res.json();
};
