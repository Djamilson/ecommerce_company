import { inject, injectable } from 'tsyringe';

import ISectionsRepository from '../repositories/ISectionsRepository';

interface ISection {
  id: string;
  name: string;
}
@injectable()
class AllSectionsService {
  constructor(
    @inject('SectionsRepository')
    private sectionsRepository: ISectionsRepository,
  ) {}

  public async execute(): Promise<ISection[] | undefined> {
    const sections = await this.sectionsRepository.findAll();

    return sections;
  }
}

export default AllSectionsService;
