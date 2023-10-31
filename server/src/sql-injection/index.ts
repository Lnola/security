import { Router } from 'express';
import { searchVulnarable } from './controller';

const router = Router();
const path = '/sql-injection';

router.get('/vulnarable', searchVulnarable);

export default { path, router };
