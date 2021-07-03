import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSectionsPaginationService from '@modules/sections/services/ListSectionsPaginationService';

export default class SectionsListPaginationController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page, limit, q } = req.query;
    const pageSize = limit;

    const query = `%${q || ''}%`; // string de consulta

    const listSections = container.resolve(ListSectionsPaginationService);

    const sections = await listSections.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      query,
    });

    return res.json(classToClass(sections));
  }
}
