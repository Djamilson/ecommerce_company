import { inject, injectable } from 'tsyringe';

import { CountColorSizeProduct } from '../infra/typeorm/entities/CountColorSizeProduct';
import ICountsColorsSizesProductsRepository from '../repositories/ICountsColorsSizesProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindCountColorSizeProductService {
  constructor(
    @inject('CountsColorsSizesProductsRepoitory')
    private countsColorsSizesProductsRepository: ICountsColorsSizesProductsRepository,
  ) {}

  public async execute({
    id,
  }: IRequest): Promise<CountColorSizeProduct | undefined> {
    const product = await this.countsColorsSizesProductsRepository.findById(id);

    return product;
  }
}

export { FindCountColorSizeProductService };
