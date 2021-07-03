import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Price from '../infra/typeorm/entities/Price';
import IPricesRepository from '../repositories/IPricesRepository';

interface IRequest {
  price_id: string;
  price: string;
}

@injectable()
class UpdatePricesService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,
  ) {}

  public async execute({ price_id, price }: IRequest): Promise<Price> {
    const newPrice = await this.pricesRepository.findById(price_id);

    if (!newPrice) {
      throw new AppError(' Not exist price.', 401);
    }

    newPrice.price = price;

    return this.pricesRepository.save(newPrice);
  }
}

export default UpdatePricesService;
