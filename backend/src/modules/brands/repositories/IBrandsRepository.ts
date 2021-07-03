import IBrandDTO from '../dtos/IBrandDTO';
import ICreateBrandDTO from '../dtos/ICreateBrandDTO';
import ITotalBrandDTO from '../dtos/ITotalBrandDTO';
import Brand from '../infra/typeorm/entities/Brand';

export default interface IBrandsRepository {
  findAllBrandPagination(object: IBrandDTO): Promise<ITotalBrandDTO>;

  findAll(): Promise<Brand[] | undefined>;
  findById(id: string): Promise<Brand | undefined>;
  findByName(name: string): Promise<Brand | undefined>;
  create(data: ICreateBrandDTO): Promise<Brand>;
  save(brand: Brand): Promise<Brand>;
  delete(id: string): Promise<void>;
}
