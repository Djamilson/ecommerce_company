import { inject, injectable } from 'tsyringe';

import IBrandsRepository from '../repositories/IBrandsRepository';

interface IBrand {
  name: string;
}

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface IBrandsReturn {
  brands: IBrand[] | undefined;

  brandInfo: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

@injectable()
class ListBrandsPaginationService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<IBrandsReturn> {
    const {
      result,
      total,
    } = await this.brandsRepository.findAllBrandPagination({
      page,
      pageSize,
      query,
    });

    const pages = Math.ceil(total / pageSize);

    const brandInfo = { page, pages, total, limit: pageSize };

    return { brands: result, brandInfo };
  }
}

export default ListBrandsPaginationService;
