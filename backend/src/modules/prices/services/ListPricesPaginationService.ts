import { inject, injectable } from 'tsyringe';

import IPricesRepository from '../repositories/IPricesRepository';

interface IPrice {
  price: string;
  company_product_id: string;
  user_id: string;
}

interface IRequest {
  page: number;
  pageSize: number;
  query: string;
}

interface IPricesReturn {
  prices: IPrice[] | undefined;

  priceInfo: {
    page: number;
    pages: number;
    total: number;
    limit: number;
  };
}

@injectable()
class ListPricesPaginationService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    query,
  }: IRequest): Promise<IPricesReturn> {
    const {
      result,
      total,
    } = await this.pricesRepository.findAllPricePagination({
      page,
      pageSize,
      query,
    });

    const pages = Math.ceil(total / pageSize);

    const priceInfo = { page, pages, total, limit: pageSize };

    return { prices: result, priceInfo };
  }
}

export default ListPricesPaginationService;
