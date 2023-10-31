import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status';
import db from '../shared/database';
import HttpError from '../shared/error/http-error';

const queries = {
  searchVulnarable: (username: unknown) => {
    return db.query(
      `SELECT username FROM users WHERE username = '${username}';`
    );
  },
};

export const searchVulnarable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.query.username;
    if (!username)
      return next(new HttpError(BAD_REQUEST, 'Missing username parameter'));
    const result = await queries.searchVulnarable(username);
    return res.json(result.rows);
  } catch (error) {
    console.log(error);
    return next(new Error());
  }
};
