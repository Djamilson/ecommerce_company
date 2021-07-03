import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBrandsService from '@modules/brands/services/AllBrandsService';
import CreateBrandsService from '@modules/brands/services/CreateBrandsService';
import FindBrandService from '@modules/brands/services/FindBrandService';
import UpdateBrandsService from '@modules/brands/services/UpdateBrandsService';

export default class BrandsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { brandId } = req.params;

    const findBrand = container.resolve(FindBrandService);

    const brand = await findBrand.execute({ id: brandId });

    return res.json(classToClass(brand));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listBrands = container.resolve(ListBrandsService);

    const brands = await listBrands.execute();

    return res.json(classToClass(brands));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createBrand = container.resolve(CreateBrandsService);
      const brand = await createBrand.execute(req.body);
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
      const { name } = req.body;
      const updateBrand = container.resolve(UpdateBrandsService);
      const brand = await updateBrand.execute({ brand_id: brandId, name });
      return res.json(classToClass(brand));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
