import times from 'lodash/times';
import db from '../';

const queries = {
  beginTransaction: () => {
    return db.query(`BEGIN`);
  },
  commitTransaction: () => {
    return db.query(`COMMIT`);
  },
  rollbackTransaction: () => {
    return db.query(`ROLLBACK`);
  },
  checkTableExists: () => {
    return db.query(`SELECT to_regclass('users') IS NOT NULL AS exists;`);
  },
  checkTableEmpty: () => {
    return db.query(`SELECT COUNT(*) = 0 AS is_empty FROM users;`);
  },
  createUsers: () => {
    return db.query(
      `CREATE TABLE users (id serial PRIMARY KEY, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL);`
    );
  },
  seedUsers: () => {
    const createUser = (index: number) => {
      return `('user${index + 1}', 'user${index + 1}@example.com')`;
    };
    const users = times(30, createUser).join(',');
    return db.query(`INSERT INTO users (username, email) VALUES ${users};`);
  },
};

const initializeUsers = async () => {
  try {
    await queries.beginTransaction();
    const tableExists = (await queries.checkTableExists()).rows[0].exists;
    if (!tableExists) await queries.createUsers();
    const tableEmpty = (await queries.checkTableEmpty()).rows[0].is_empty;
    if (tableEmpty) await queries.seedUsers();
    await queries.commitTransaction();
    return true;
  } catch (error) {
    await queries.rollbackTransaction();
    console.error('Error:', error);
    return false;
  }
};

export default initializeUsers;
