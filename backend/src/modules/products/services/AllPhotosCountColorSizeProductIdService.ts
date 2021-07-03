import { injectable, inject } from 'tsyringe';

import { Photo } from '../infra/typeorm/entities/Photo';
import IPhotosRepository from '../repositories/IPhotosRepository';

interface IResponse {
  count_color_size_product_id: string;
}

@injectable()
class AllPhotosCountColorSizeProductIdService {
  constructor(
    @inject('PhotosRepository')
    private photosRepository: IPhotosRepository,
  ) {}

  public async execute({
    count_color_size_product_id,
  }: IResponse): Promise<Photo[] | undefined> {
    const photos = await this.photosRepository.findAllByCountColorSizeProductId(
      count_color_size_product_id,
    );

    return photos;
  }
}

export default AllPhotosCountColorSizeProductIdService;
