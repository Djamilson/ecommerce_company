import { getRepository, Repository } from 'typeorm';

import IPhotoDTO from '@modules/products/dtos/IPhotoDTO';
import IPhotosRepository from '@modules/products/repositories/IPhotosRepository';

import { Photo } from '../entities/Photo';

class PhotosRepository implements IPhotosRepository {
  private photosRepository: Repository<Photo>;

  constructor() {
    this.photosRepository = getRepository(Photo);
  }

  public async findById(id: string): Promise<Photo | undefined> {
    const photo = await this.photosRepository.findOne(id);

    return photo;
  }

  public async findAllByCountColorSizeProductId(
    id: string,
  ): Promise<Photo[] | undefined> {
    const allPhotos = await this.photosRepository.find({
      count_color_size_product_id: id,
    });

    return allPhotos;
  }

  public async create(photo: IPhotoDTO): Promise<Photo> {
    const newPhoto = this.photosRepository.create(photo);

    await this.photosRepository.save(newPhoto);

    return newPhoto;
  }

  public async save(item: Photo): Promise<Photo> {
    return this.photosRepository.save(item);
  }

  public async delete(id: string): Promise<void> {
    await this.photosRepository.delete(id);
  }
}

export default PhotosRepository;
