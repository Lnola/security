import { Router } from 'express';
import forEach from 'lodash/forEach';
import sqlInjection from './sql-injection';

type Controller = { path: string; router: Router };

const controllers: Controller[] = [sqlInjection];
const router = Router();

forEach(controllers, (controller: Controller) => {
  router.use(controller.path, controller.router);
});

export default router;
