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
    return db.query(`SELECT to_regclass('admin') IS NOT NULL AS exists;`);
  },
  createAdmin: () => {
    return db.query(
      `CREATE TABLE admin (id serial PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);`
    );
  },
  seedAdmin: () => {
    return db.query(
      `INSERT INTO admin (username, password) VALUES ('admin', 'password');`
    );
  },
};

const initializeAdmin = async () => {
  try {
    await queries.beginTransaction();
    const tableExists = (await queries.checkTableExists()).rows[0].exists;
    if (!tableExists) await queries.createAdmin();
    await queries.seedAdmin();
    await queries.commitTransaction();
    return true;
  } catch (error) {
    await queries.rollbackTransaction();
    console.error('Error:', error);
    return false;
  }
};

export default initializeAdmin;
