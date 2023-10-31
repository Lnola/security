export const searchVulnarable = (username: string): Promise<string> => {
  return Promise.resolve(username + ' vulnarable');
};
export const searchSecure = (username: string): Promise<string> => {
  return Promise.resolve(username + ' secure');
};
