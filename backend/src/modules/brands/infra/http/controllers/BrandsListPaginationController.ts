import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListBrandsPaginationService from '@modules/brands/services/ListBrandsPaginationService';

export default class BrandsListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q } = req.query;
    const pageSize = limit;
    console.log('req.query==============', req.query);

    const query = `%${q || ''}%`; // string de consulta

    const listBrands = container.resolve(ListBrandsPaginationService);

    const brands = await listBrands.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(classToClass(brands));
  }
}
