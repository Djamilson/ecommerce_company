import { inject, injectable } from 'tsyringe';

import { CountColorSizeProduct } from '../infra/typeorm/entities/CountColorSizeProduct';
import ICountsColorsSizesProductsRepository from '../repositories/ICountsColorsSizesProductsRepository';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface ICountsColorsSizesProductsReturn {
  countsColorsSizesProducts: CountColorSizeProduct[] | undefined;

  countColorSizeProductInfo: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

@injectable()
class ListCountsColorsSizeProductsPaginationService {
  constructor(
    @inject('CountsColorsSiszesProductsRepository')
    private countsColorsSiszesProductsRepository: ICountsColorsSizesProductsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<ICountsColorsSizesProductsReturn> {
    console.log('=>>>::', page, pageSize, query);
    const {
      result,
      total,
    } = await this.countsColorsSiszesProductsRepository.findAllCountColorSizeProductPagination(
      {
        page,
        pageSize,
        query,
      },
    );

    console.log(' result, total', result, total);

    const pages = Math.ceil(total / pageSize);

    const countColorSizeProductInfo = { page, pages, total, limit: pageSize };

    return { countsColorsSizesProducts: result, countColorSizeProductInfo };
  }
}

export { ListCountsColorsSizeProductsPaginationService };
