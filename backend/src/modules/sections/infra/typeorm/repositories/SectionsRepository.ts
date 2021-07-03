import { getRepository, Raw, Repository } from 'typeorm';

import ICreateSectionDTO from '@modules/sections/dtos/ICreateSectionDTO';
import ISectionDTO from '@modules/sections/dtos/ISectionDTO';
import ITotalSectionDTO from '@modules/sections/dtos/ITotalSectionDTO';
import ISectionsRepository from '@modules/sections/repositories/ISectionsRepository';

import Section from '../entities/Section';

class SectionsRepository implements ISectionsRepository {
  private ormSectionRepository: Repository<Section>;

  constructor() {
    this.ormSectionRepository = getRepository(Section);
  }

  public async findAllSectionPagination(
    object: ISectionDTO,
  ): Promise<ITotalSectionDTO> {
    const { page, pageSize, query } = object;

    const [result, total] = await this.ormSectionRepository.findAndCount({
      where: {
        name: Raw(alias => `${alias} ILIKE '${query}'`),
      },
      order: { name: 'ASC' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return { result, total };
  }

  public async findAll(): Promise<Section[] | undefined> {
    const findAllSections = await this.ormSectionRepository.find();

    return findAllSections;
  }

  public async findByName(name: string): Promise<Section | undefined> {
    const section = await this.ormSectionRepository.findOne({
      name,
    });

    return section;
  }

  public async findById(id: string): Promise<Section | undefined> {
    const section = await this.ormSectionRepository.findOne(id);

    return section;
  }

  public async create(section: ICreateSectionDTO): Promise<Section> {
    const newSection = this.ormSectionRepository.create(section);

    await this.ormSectionRepository.save(newSection);

    return newSection;
  }

  public async save(section: Section): Promise<Section> {
    return this.ormSectionRepository.save(section);
  }

  public async delete(id: string): Promise<void> {
    await this.ormSectionRepository.delete(id);
  }
}

export default SectionsRepository;
