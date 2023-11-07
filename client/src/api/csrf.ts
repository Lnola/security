import request from './request';

const urls = {
  root: '/csrf',
  get vulnarable() {
    return this.root + '/vulnarable';
  },
  get secure() {
    return this.root + '/secure';
  },
  get verifyPassword() {
    return this.root + '/verify';
  },
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
  return request.get(urls.verifyPassword, { params });
};

export const resetUser = (): Promise<void> => {
  return request.post(urls.resetAdminTable);
};
