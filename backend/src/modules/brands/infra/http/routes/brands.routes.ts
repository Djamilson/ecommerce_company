import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import uploadConfig from '@config/upload';

import BrandsController from '../controllers/BrandsController';
import BrandsImageController from '../controllers/BrandsImageController';
import BrandsListPaginationController from '../controllers/BrandsListPaginationController';

const upload = multer(uploadConfig.multer);
const brandsRouter = Router();

const brandsListPaginationController = new BrandsListPaginationController();
const brandsController = new BrandsController();
const brandsImageController = new BrandsImageController();

brandsRouter.use(ensureAuthenticated);

brandsRouter.get('/', brandsController.index);

brandsRouter.get('/pagination', brandsListPaginationController.index);
brandsRouter.get(
  '/:brandId',
  celebrate({
    [Segments.PARAMS]: {
      brandId: Joi.string().uuid().required(),
    },
  }),
  brandsController.show,
);

brandsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandsController.create,
);

brandsRouter.patch(
  '/:brandId/name',
  celebrate({
    [Segments.PARAMS]: {
      brandId: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  brandsController.update,
);

brandsRouter.post(
  '/image',
  upload.single('file'),
  brandsImageController.create,
);

brandsRouter.patch(
  '/:brandId/image',
  upload.single('file'),
  brandsImageController.update,
);
export default brandsRouter;
