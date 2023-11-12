import request from './request';
import { extractData } from './helpers';

const urls = {
  root: '/csrf',
  get token() {
    return this.root + '/token';
  },
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

type UpdatePasswordSecureDto = UpdatePasswordDto & {
  token: string | null;
};

type VerifyPasswordDto = {
  username: string;
  password: string;
};

export const fetchToken = () => {
  return request.get(urls.token).then(extractData);
};

export const updatePasswordVulnarable = (
  params: UpdatePasswordDto,
): Promise<void> => {
  return request.post(urls.vulnarable, { ...params });
};

export const updatePasswordSecure = (
  params: UpdatePasswordSecureDto,
): Promise<string> => {
  return request.post(urls.secure, { ...params }).then(extractData);
};

export const verifyPassword = (params: VerifyPasswordDto): Promise<void> => {
  return request.get(urls.verifyPassword, { params });
};

export const resetUser = (): Promise<void> => {
  return request.post(urls.resetAdminTable);
};
