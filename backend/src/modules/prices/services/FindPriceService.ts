import { inject, injectable } from 'tsyringe';

import Price from '../infra/typeorm/entities/Price';
import IPricesRepository from '../repositories/IPricesRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindPriceService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Price | undefined> {
    const price = await this.pricesRepository.findById(id);

    return price;
  }
}

export default FindPriceService;
