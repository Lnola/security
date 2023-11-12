import { Router } from 'express';
import {
  updatePasswordVulnarable,
  updatePasswordSecure,
  resetAdminTable,
  verifyPassword,
} from './controller';

const router = Router();
const path = '/csrf';

router.post('/vulnarable', updatePasswordVulnarable);
router.post('/secure', updatePasswordSecure);
router.get('/verify', verifyPassword);
router.post('/reset-admin-table', resetAdminTable);

export default { path, router };
