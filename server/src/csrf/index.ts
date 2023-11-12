import { Router } from 'express';
import {
  getToken,
  updatePasswordVulnarable,
  updatePasswordSecure,
  resetAdminTable,
  verifyPassword,
} from './controller';

const router = Router();
const path = '/csrf';

router.get('/token', getToken);
router.post('/vulnarable', updatePasswordVulnarable);
router.post('/secure', updatePasswordSecure);
router.get('/verify', verifyPassword);
router.post('/reset-admin-table', resetAdminTable);

export default { path, router };
