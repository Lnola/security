import request from './request';
// import { extractData } from './helpers';

const urls = {
  root: '/csrf',
  get resetAdminTable() {
    return this.root + '/reset-admin-table';
  },
};

type UpdatePasswordDto = {
  username: string;
  newPassword: string;
};

type VerifyPasswordDto = {
  username: string;
  password: string;
};

export const updatePasswordVulnarable = (
  params: UpdatePasswordDto,
): Promise<void> => {
  console.log(params);
  return Promise.resolve();
};

export const updatePasswordSecure = (
  params: UpdatePasswordDto,
): Promise<void> => {
  console.log(params);
  return Promise.reject();
};

export const verifyPassword = (params: VerifyPasswordDto): Promise<void> => {
  console.log(params);
  return Promise.resolve();
};

export const resetUser = (): Promise<void> => {
  return request.post(urls.resetAdminTable);
};
