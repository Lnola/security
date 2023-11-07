import { Request, Response, NextFunction } from 'express';
import { ValuesType } from 'utility-types';
import { BAD_REQUEST, OK } from 'http-status';
import db from '../shared/database';
import HttpError from '../shared/error/http-error';
import initializeUsers from 'shared/database/initialization/users';

const queries = {
  searchVulnarable: (username: unknown) => {
    return db.query(
      `SELECT username, email FROM users WHERE username = '${username}';`
    );
  },
  searchSecure: (username: unknown) => {
    return db.query('SELECT username, email FROM users WHERE username = $1', [
      username,
    ]);
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
  const username = req.query.username as string;
  if (/[<>&'";=#@]/.test(username) || / or /i.test(username))
    return next(new HttpError(BAD_REQUEST, 'Invalid characters'));
  return search(queries.searchSecure, req, res, next);
};

export const resetUsersTable = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const wasInitialized = await initializeUsers(true);
  if (!wasInitialized) return next(new Error());
  return res.json(OK);
};
