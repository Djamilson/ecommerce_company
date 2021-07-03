import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListPricesPaginationService from '@modules/prices/services/ListPricesPaginationService';

export default class PricesListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `%${q || ''}%`; // string de consulta

    const listPrices = container.resolve(ListPricesPaginationService);

    const prices = await listPrices.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(classToClass(prices));
  }
}
