import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface IProductsReturn {
  products: Product[] | undefined;

  productInfo: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

@injectable()
class ListProductsPaginationService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<IProductsReturn> {
    console.log('=>>>::', page, pageSize, query);
    const { result, total } = await this.productsRepository.findAllPagination({
      page,
      pageSize,
      query,
    });

    console.log(' result, total', result, total);

    const pages = Math.ceil(total / pageSize);

    const productInfo = { page, pages, total, limit: pageSize };

    return { products: result, productInfo };
  }
}

export { ListProductsPaginationService };
