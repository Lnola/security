// import request from './request';
// import { extractData } from './helpers';

// const urls = {
//   root: '/csrf',
//   get vulnarable() {
//     return this.root + '/vulnarable';
//   },
//   get secure() {
//     return this.root + '/secure';
//   },
// };

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
