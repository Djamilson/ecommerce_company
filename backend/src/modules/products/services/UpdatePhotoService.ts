import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import { Photo } from '../infra/typeorm/entities/Photo';
import IPhotosRepository from '../repositories/IPhotosRepository';

interface IRequest {
  photo_id: string;
  imageFilename: string;
}

@injectable()
class UpdateProductImageService {
  constructor(
    @inject('PhotosRepoitory')
    private photosRepository: IPhotosRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ photo_id, imageFilename }: IRequest): Promise<Photo> {
    const photo = await this.photosRepository.findById(photo_id);

    if (!photo) {
      throw new AppError('Only authenticated product can change avatar.', 401);
    }

    if (photo.photo) {
      await this.storageProvider.deleteFile(photo.photo);
    }

    const filename = await this.storageProvider.saveFile(imageFilename);

    photo.photo = filename;

    return this.photosRepository.save(photo);
  }
}

export default UpdateProductImageService;
