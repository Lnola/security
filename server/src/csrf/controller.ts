import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status';
import initializeAdmin from 'shared/database/initialization/admin';

export const resetAdminTable = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const wasInitialized = await initializeAdmin();
  if (!wasInitialized) return next(new Error());
  return res.json(OK);
};
