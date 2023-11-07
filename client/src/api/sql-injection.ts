import request from './request';
import { extractData } from './helpers';

const urls = {
  root: '/sql-injection',
  get vulnarable() {
    return this.root + '/vulnarable';
  },
  get secure() {
    return this.root + '/secure';
  },
  get resetUsersTable() {
    return this.root + '/reset-users-table';
  },
};

type SearchDto = {
  username: string;
};

export const searchVulnarable = (params: SearchDto): Promise<string> => {
  return request.get(urls.vulnarable, { params }).then(extractData);
};

export const searchSecure = (params: SearchDto): Promise<string> => {
  return request.get(urls.secure, { params }).then(extractData);
};

export const resetUsersTable = () => {
  return request.post(urls.resetUsersTable);
};
