import { Router } from 'express';
import { searchVulnarable, searchSecure, resetUsersTable } from './controller';

const router = Router();
const path = '/sql-injection';

router.get('/vulnarable', searchVulnarable);
router.get('/secure', searchSecure);
router.post('/reset-users-table', resetUsersTable);

export default { path, router };
