import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

interface IResponse {
  name: string;
}

@injectable()
class CreateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute({ name }: IResponse): Promise<Brand> {
    const checkBrandExists = await this.brandsRepository.findByName(name);

    if (checkBrandExists) {
      throw new AppError('Brand already used.');
    }

    const branch = await this.brandsRepository.create({
      name,
    });

    return branch;
  }
}

export default CreateBrandService;
