import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSectionsService from '@modules/sections/services/AllSectionsService';
import CreateSectionsService from '@modules/sections/services/CreateSectionsService';
import FindSectionService from '@modules/sections/services/FindSectionService';
import UpdateSectionsService from '@modules/sections/services/UpdateSectionsService';

export default class SectionsController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { sectionId } = req.params;

    const findSection = container.resolve(FindSectionService);

    const section = await findSection.execute({ id: sectionId });

    return res.json(classToClass(section));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listSections = container.resolve(ListSectionsService);

    const sections = await listSections.execute();

    return res.json(classToClass(sections));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const createSection = container.resolve(CreateSectionsService);
      const section = await createSection.execute({
        name: req.body.name,
      });
      return res.json(classToClass(section));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { sectionId } = req.params;
      const { name } = req.body;

      const updateSection = container.resolve(UpdateSectionsService);
      const section = await updateSection.execute({
        section_id: sectionId,
        name,
      });
      return res.json(classToClass(section));
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.message, statusCode: error.statusCode });
    }
  }
}
