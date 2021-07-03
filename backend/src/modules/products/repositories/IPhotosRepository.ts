import IPhotoDTO from '../dtos/IPhotoDTO';
import { Photo } from '../infra/typeorm/entities/Photo';

export default interface IPhotosRepository {
  findById(id: string): Promise<Photo | undefined>;
  findAllByCountColorSizeProductId(id: string): Promise<Photo[] | undefined>;

  create(photo: IPhotoDTO): Promise<Photo>;
  save(photo: Photo): Promise<Photo>;
  delete(id: string): Promise<void>;
}
