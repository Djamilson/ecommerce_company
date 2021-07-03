import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

interface IRequest {
  brand_id: string;
  name: string;
}

@injectable()
class UpdateBrandsService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({ brand_id, name }: IRequest): Promise<Brand> {
    const brand = await this.brandsRepository.findById(brand_id);

    if (!brand) {
      throw new AppError('Not exist brand.', 401);
    }

    const oldBrand = await this.brandsRepository.findByName(name);

    if (oldBrand && oldBrand.id !== brand_id) {
      throw new AppError('Brand already in use.', 402);
    }

    brand.name = name;

    return this.brandsRepository.save(brand);
  }
}

export default UpdateBrandsService;
