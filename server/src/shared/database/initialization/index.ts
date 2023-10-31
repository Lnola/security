import forEach from 'lodash/forEach';
import initializeUsers from './users';
import initializeAdmin from './admin';

const initializators = [initializeUsers, initializeAdmin];

forEach(initializators, async (initializator) => await initializator());
