import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status';
import initializeAdmin from 'shared/database/initialization/admin';

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
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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
