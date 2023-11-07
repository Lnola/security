import { Router } from 'express';
import forEach from 'lodash/forEach';
import sqlInjection from './sql-injection';
import csrf from './csrf';

type Controller = { path: string; router: Router };

const controllers: Controller[] = [sqlInjection, csrf];
const router = Router();

forEach(controllers, (controller: Controller) => {
  router.use(controller.path, controller.router);
});

export default router;
