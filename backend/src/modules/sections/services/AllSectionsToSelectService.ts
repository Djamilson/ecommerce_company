import { inject, injectable } from 'tsyringe';

import ISectionsRepository from '../repositories/ISectionsRepository';

interface IOptionSelect {
  value: string;
  label: string;
}

@injectable()
class AllSectionsToSelectService {
  constructor(
    @inject('SectionsRepository')
    private sectionsRepository: ISectionsRepository,
  ) {}

  public async execute(): Promise<IOptionSelect[] | undefined> {
    const sections = await this.sectionsRepository.findAll();

    const serealizabled = sections?.map(section => {
      return {
        value: section.id,
        label: section.name,
      };
    });
    return serealizabled;
  }
}

export default AllSectionsToSelectService;
