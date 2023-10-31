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
};

export const searchVulnarable = (username: string): Promise<string> => {
  const params = { username };
  return request.get(urls.vulnarable, { params }).then(extractData);
};

export const searchSecure = (username: string): Promise<string> => {
  const params = { username };
  return request.get(urls.secure, { params }).then(extractData);
};
