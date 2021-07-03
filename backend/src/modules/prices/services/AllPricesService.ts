import { inject, injectable } from 'tsyringe';

import IPricesRepository from '../repositories/IPricesRepository';

interface IPrice {
  id: string;
  price: number;
  company_product_id: string;
}
@injectable()
class ListPricesService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,
  ) {}

  public async execute(): Promise<IPrice[] | undefined> {
    const prices = await this.pricesRepository.findAll();

    const serealizable = prices?.map(item => {
      return {
        ...item,
        price: Number(item.price),
      };
    });

    return serealizable;
  }
}

export default ListPricesService;
