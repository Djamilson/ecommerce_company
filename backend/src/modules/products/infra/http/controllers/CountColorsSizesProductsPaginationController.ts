import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCountsColorsSizeProductsPaginationService } from '@modules/products/services/ListCountsColorsSizeProductsPaginationService';

class CountColorsSizesProductsPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `%${q || ''}%`;

    const productsList = container.resolve(
      ListCountsColorsSizeProductsPaginationService,
    );

    const list = await productsList.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(classToClass(list));
  }
}

export { CountColorsSizesProductsPaginationController };
