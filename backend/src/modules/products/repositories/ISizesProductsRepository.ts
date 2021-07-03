import ICreateSizeProductDTO from '../dtos/ICreateSizeProductDTO';
import { SizeProduct } from '../infra/typeorm/entities/SizeProduct';

export default interface ISizesProductsRepository {
  findById(id: string): Promise<SizeProduct | undefined>;
  findAll(): Promise<SizeProduct[] | undefined>;

  create(color: ICreateSizeProductDTO): Promise<SizeProduct>;
  save(color: SizeProduct): Promise<SizeProduct>;
}
