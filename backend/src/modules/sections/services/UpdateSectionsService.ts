import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Section from '../infra/typeorm/entities/Section';
import ISectionsRepository from '../repositories/ISectionsRepository';

interface IRequest {
  section_id: string;
  name: string;
}

@injectable()
class UpdateSectionsService {
  constructor(
    @inject('SectionsRepository')
    private sectionsRepository: ISectionsRepository,
  ) {}

  public async execute({ section_id, name }: IRequest): Promise<Section> {
    const section = await this.sectionsRepository.findById(section_id);

    if (!section) {
      throw new AppError('Not exist section.', 401);
    }

    const sectionExists = await this.sectionsRepository.findByName(name);

    if (sectionExists) {
      throw new AppError('Section already use.', 402);
    }

    section.name = name;

    return this.sectionsRepository.save(section);
  }
}

export default UpdateSectionsService;
