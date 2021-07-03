import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import PricesController from '../controllers/PricesController';
import PricesListPaginationController from '../controllers/PricesListPaginationController';

const pricesRouter = Router();

const pricesListPaginationController = new PricesListPaginationController();
const pricesController = new PricesController();

pricesRouter.use(ensureAuthenticated);

pricesRouter.get('/', pricesController.index);

pricesRouter.get('/pagination', pricesListPaginationController.index);
pricesRouter.get(
  '/:priceId',
  celebrate({
    [Segments.PARAMS]: {
      priceId: Joi.string().uuid().required(),
    },
  }),
  pricesController.show,
);

pricesRouter.post(
  '/:companyProductId',
  celebrate({
    [Segments.PARAMS]: {
      companyProductId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      price: Joi.number().required(),
    },
  }),
  pricesController.create,
);

pricesRouter.patch(
  '/:priceId',
  celebrate({
    [Segments.PARAMS]: {
      priceId: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      price: Joi.number().required(),
    },
  }),
  pricesController.update,
);

export default pricesRouter;
