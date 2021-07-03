import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import SectionsController from '../controllers/SectionsController';
import SectionsListPaginationController from '../controllers/SectionsListPaginationController';
import SectionsSelectOptionController from '../controllers/SectionsSelectOptionController';

const sectionsRouter = Router();

const sectionsListPaginationController = new SectionsListPaginationController();
const sectionsController = new SectionsController();

const sectionsSelectOptionController = new SectionsSelectOptionController();

sectionsRouter.use(ensureAuthenticated);

sectionsRouter.get('/', sectionsController.index);

sectionsRouter.get('/selects/options', sectionsSelectOptionController.index);

sectionsRouter.get('/pagination', sectionsListPaginationController.index);
sectionsRouter.get(
  '/:sectionId',
  celebrate({
    [Segments.PARAMS]: {
      sectionId: Joi.string().uuid().required(),
    },
  }),
  sectionsController.show,
);

sectionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  sectionsController.create,
);

sectionsRouter.patch(
  '/:sectionId/name',
  celebrate({
    [Segments.PARAMS]: {
      sectionId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  sectionsController.update,
);

export default sectionsRouter;
