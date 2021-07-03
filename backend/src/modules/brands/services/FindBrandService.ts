import { inject, injectable } from 'tsyringe';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Brand | undefined> {
    const brand = await this.brandsRepository.findById(id);

    return brand;
  }
}

export default FindBrandService;
