import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AllSectionsToSelect from '@modules/sections/services/AllSectionsToSelectService';

export default class SectionsSelectOptionController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listSections = container.resolve(AllSectionsToSelect);

    const sections = await listSections.execute();

    return res.json(classToClass(sections));
  }
}
