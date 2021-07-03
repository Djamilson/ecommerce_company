import ICreateSectionDTO from '../dtos/ICreateSectionDTO';
import ISectionDTO from '../dtos/ISectionDTO';
import ITotalSectionDTO from '../dtos/ITotalSectionDTO';
import Section from '../infra/typeorm/entities/Section';

export default interface ISectionsRepository {
  findAllSectionPagination(object: ISectionDTO): Promise<ITotalSectionDTO>;

  findAll(): Promise<Section[] | undefined>;
  findById(id: string): Promise<Section | undefined>;
  findByName(name: string): Promise<Section | undefined>;
  create(data: ICreateSectionDTO): Promise<Section>;
  save(section: Section): Promise<Section>;
  delete(id: string): Promise<void>;
}
