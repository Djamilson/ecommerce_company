import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import ProductsController from '../controllers/ProductsController';
import { ProductsPaginationController } from '../controllers/ProductsPaginationControlle';

const productsRouter = Router();
const productsController = new ProductsController();
const productsPaginationController = new ProductsPaginationController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);

productsRouter.get('/all', productsPaginationController.index);

productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      section_id: Joi.string().uuid().required(),
      brand_id: Joi.string().uuid().optional().allow(''),
    },
  }),
  productsController.create,
);

export default productsRouter;
