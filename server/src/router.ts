import { Router } from 'express';
import forEach from 'lodash/forEach';

type Controller = { path: string; router: Router };

const controllers: Controller[] = [];
const router = Router();

forEach(controllers, (controller: Controller) => {
  router.use(controller.path, controller.router);
});

export default router;
