import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

import uploadConfig from '@config/upload';

import PhotosController from '../controllers/PhotosController';

const photosRouter = Router();
const productImageController = new PhotosController();

const upload = multer(uploadConfig.multer);

photosRouter.use(ensureAuthenticated);

// router /photos
photosRouter.post(
  '/photos',
  upload.single('file'),
  productImageController.update,
);

// router /photos/:photoId
photosRouter.patch(
  '/:photoId',
  upload.single('file'),
  productImageController.update,
);

export default photosRouter;
