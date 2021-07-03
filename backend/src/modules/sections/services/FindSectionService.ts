import { inject, injectable } from 'tsyringe';

import Section from '../infra/typeorm/entities/Section';
import ISectionsRepository from '../repositories/ISectionsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindSectionService {
  constructor(
    @inject('SectionsRepository')
    private sectionsRepository: ISectionsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Section | undefined> {
    const section = await this.sectionsRepository.findById(id);

    return section;
  }
}

export default FindSectionService;
