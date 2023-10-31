import forEach from 'lodash/forEach';
import initializeUsers from './users';

const initializators = [initializeUsers];

forEach(initializators, (initializator) => initializator());
