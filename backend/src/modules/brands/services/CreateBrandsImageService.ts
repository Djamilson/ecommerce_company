import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

interface IResponse {
  name: string;
  image: string;
}

@injectable()
class CreateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ name, image }: IResponse): Promise<Brand> {
    const checkBrandExists = await this.brandsRepository.findByName(name);

    if (checkBrandExists) {
      throw new AppError('Brand already used.');
    }

    if (image) {
      await this.storageProvider.deleteFile(image);
    }

    const filename = await this.storageProvider.saveFile(image);

    const branch = await this.brandsRepository.create({
      name,
      image: filename,
    });

    return branch;
  }
}

export default CreateBrandService;
