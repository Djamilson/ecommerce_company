import { inject, injectable } from 'tsyringe';

import ISectionsRepository from '../repositories/ISectionsRepository';

interface ISection {
  name: string;
}

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface ISectionsReturn {
  sections: ISection[] | undefined;

  sectionInfo: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

@injectable()
class ListSectionsPaginationService {
  constructor(
    @inject('SectionsRepository')
    private sectionsRepository: ISectionsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<ISectionsReturn> {
    const {
      result,
      total,
    } = await this.sectionsRepository.findAllSectionPagination({
      page,
      pageSize,
      query,
    });

    const pages = Math.ceil(total / pageSize);

    const sectionInfo = { page, pages, total, limit: pageSize };

    return { sections: result, sectionInfo };
  }
}

export default ListSectionsPaginationService;
