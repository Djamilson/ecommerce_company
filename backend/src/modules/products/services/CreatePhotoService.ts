import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import { Photo } from '../infra/typeorm/entities/Photo';
import ICountsColorsSizesProductsRepository from '../repositories/ICountsColorsSizesProductsRepository';
import IPhotosRepository from '../repositories/IPhotosRepository';

interface IRequest {
  imageFilename: string;
  count_color_size_product_id: string;
}

@injectable()
class CreatePhotoService {
  constructor(
    @inject('CountsColorsSizesProductsRepoitory')
    private countsColorsSizesProductsRepository: ICountsColorsSizesProductsRepository,

    @inject('PhotosRepoitory')
    private photosRepository: IPhotosRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    count_color_size_product_id,
    imageFilename,
  }: IRequest): Promise<Photo> {
    const product = await this.countsColorsSizesProductsRepository.findById(
      count_color_size_product_id,
    );

    if (!product) {
      throw new AppError('Only authenticated product can change avatar.', 401);
    }

    const filename = await this.storageProvider.saveFile(imageFilename);
    const photo = new Photo();

    photo.count_color_size_product_id = product.id;

    photo.photo = filename;

    return this.photosRepository.save(photo);
  }
}

export default CreatePhotoService;
