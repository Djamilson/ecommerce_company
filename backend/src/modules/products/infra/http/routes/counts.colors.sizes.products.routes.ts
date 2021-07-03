import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import { CountColorsSizesProductsController } from '../controllers/CountColorsSizesProductsController';
import { CountColorsSizesProductsPaginationController } from '../controllers/CountColorsSizesProductsPaginationController';

const countColorsSizesProductsRouter = Router();
const countColorsSizesProductsController = new CountColorsSizesProductsController();
const countColorsSizesProductsPaginationController = new CountColorsSizesProductsPaginationController();

countColorsSizesProductsRouter.use(ensureAuthenticated);

countColorsSizesProductsRouter.get(
  '/:countColorSizeProductId',
  celebrate({
    [Segments.PARAMS]: {
      countColorSizeProductId: Joi.string().uuid().required(),
    },
  }),
  countColorsSizesProductsController.show,
);

countColorsSizesProductsRouter.get(
  '/all',
  countColorsSizesProductsPaginationController.index,
);

// router /counts/colors/sizes/products/:productId
countColorsSizesProductsRouter.post(
  '/:productId',
  celebrate({
    [Segments.PARAMS]: {
      productId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      stock: Joi.number().required(),
      sku: Joi.string().required(),
      color_id: Joi.string().uuid().required(),
      size_product_id: Joi.string().uuid().optional().allow(''),

      thumbnail: Joi.string().uuid().optional().allow(''),
      bar_code: Joi.string().uuid().optional().allow(''),
    },
  }),
  countColorsSizesProductsController.create,
);

export default countColorsSizesProductsRouter;
