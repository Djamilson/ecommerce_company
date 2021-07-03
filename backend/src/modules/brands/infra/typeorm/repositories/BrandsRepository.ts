import { getRepository, Raw, Repository } from 'typeorm';

import IBrandDTO from '@modules/brands/dtos/IBrandDTO';
import ICreateBrandDTO from '@modules/brands/dtos/ICreateBrandDTO';
import ITotalBrandDTO from '@modules/brands/dtos/ITotalBrandDTO';
import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';

import Brand from '../entities/Brand';

class BrandsRepository implements IBrandsRepository {
  private ormBrandRepository: Repository<Brand>;

  constructor() {
    this.ormBrandRepository = getRepository(Brand);
  }

  public async findAllBrandPagination(
    object: IBrandDTO,
  ): Promise<ITotalBrandDTO> {
    const { page, pageSize, query } = object;

    const [result, total] = await this.ormBrandRepository.findAndCount({
      where: {
        name: Raw(alias => `${alias} ILIKE '${query}'`),
      },
      order: { name: 'ASC' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return { result, total };
  }

  public async findAll(): Promise<Brand[] | undefined> {
    const findAllBrands = await this.ormBrandRepository.find();

    return findAllBrands;
  }

  public async findByName(name: string): Promise<Brand | undefined> {
    const brand = await this.ormBrandRepository.findOne({
      name,
    });

    return brand;
  }

  public async findById(id: string): Promise<Brand | undefined> {
    const brand = await this.ormBrandRepository.findOne(id);

    return brand;
  }

  public async create(brand: ICreateBrandDTO): Promise<Brand> {
    const newBrand = this.ormBrandRepository.create(brand);

    await this.ormBrandRepository.save(newBrand);

    return newBrand;
  }

  public async save(brand: Brand): Promise<Brand> {
    return this.ormBrandRepository.save(brand);
  }

  public async delete(id: string): Promise<void> {
    await this.ormBrandRepository.delete(id);
  }
}

export default BrandsRepository;
