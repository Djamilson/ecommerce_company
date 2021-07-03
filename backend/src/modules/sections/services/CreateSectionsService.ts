import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import Section from '../infra/typeorm/entities/Section';
import ISectionsRepository from '../repositories/ISectionsRepository';

interface IResponse {
  name: string;
}

@injectable()
class CreateSectionService {
  constructor(
    @inject('SectionsRepository')
    private sectionsRepository: ISectionsRepository,
  ) {}

  public async execute({ name }: IResponse): Promise<Section> {
    const checkSectionExists = await this.sectionsRepository.findByName(name);

    if (checkSectionExists) {
      throw new AppError('Section already used.', 401);
    }

    const section = await this.sectionsRepository.create({
      name,
    });

    return section;
  }
}

export default CreateSectionService;
