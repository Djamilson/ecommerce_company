import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AllPhotosCountColorSizeProductIdService from '@modules/products/services/AllPhotosCountColorSizeProductIdService';
import CreatePhotoService from '@modules/products/services/CreatePhotoService';
import UpdatePhotoService from '@modules/products/services/UpdatePhotoService';

export default class PhotosController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { countColorSizeProductId } = req.params;

      const allPhotosCountColorSizeProducts = container.resolve(
        AllPhotosCountColorSizeProductIdService,
      );
      const photos = await allPhotosCountColorSizeProducts.execute({
        count_color_size_product_id: countColorSizeProductId,
      });
      return res.json(classToClass(photos));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createPhoto = container.resolve(CreatePhotoService);

      const { countColorSizeProductId } = req.params;

      const photo = await createPhoto.execute({
        count_color_size_product_id: countColorSizeProductId,
        imageFilename: req.file.filename,
      });

      return res.json(classToClass(photo));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const updatePhoto = container.resolve(UpdatePhotoService);

      const { photoId } = req.params;

      const photo = await updatePhoto.execute({
        photo_id: photoId,
        imageFilename: req.file.filename,
      });

      return res.json(classToClass(photo));
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
