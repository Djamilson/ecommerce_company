import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateBrandsImageService from '@modules/brands/services/CreateBrandsImageService';
import UpdateImageService from '@modules/brands/services/UpdateImageService';

export default class BrandsImageController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { filename } = req.file;

      const createBrand = container.resolve(CreateBrandsImageService);
      const brand = await createBrand.execute({
        name: req.body.name,
        image: filename,
      });
      return res.json(classToClass(brand));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { brandId } = req.params;

      const updateImageBrand = container.resolve(UpdateImageService);
      const image = await updateImageBrand.execute({
        brand_id: brandId,
        image: req.file.filename,
      });
      return res.json(classToClass(image));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
