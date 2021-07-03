import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

interface IRequest {
  image: string;
  brand_id: string;
}

@injectable()
class UpdateImageService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ brand_id, image }: IRequest): Promise<Brand> {
    const brand = await this.brandsRepository.findById(brand_id);

    if (!brand) {
      throw new AppError(' Not exist brand.', 401);
    }

    if (brand.image) {
      await this.storageProvider.deleteFile(brand.image);
    }

    const filename = await this.storageProvider.saveFile(image);

    brand.image = filename;

    return this.brandsRepository.save(brand);
  }
}

export default UpdateImageService;
