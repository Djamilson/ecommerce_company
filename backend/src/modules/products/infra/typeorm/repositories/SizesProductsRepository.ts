import { getRepository, Repository } from 'typeorm';

import ISizeProductDTO from '@modules/products/dtos/ICreateSizeProductDTO';
import ISizesProductsRepository from '@modules/products/repositories/ISizesProductsRepository';

import { SizeProduct } from '../entities/SizeProduct';

class SizesProductsRepository implements ISizesProductsRepository {
  private sizesProductsRepository: Repository<SizeProduct>;

  constructor() {
    this.sizesProductsRepository = getRepository(SizeProduct);
  }

  public async findById(id: string): Promise<SizeProduct | undefined> {
    const color = await this.sizesProductsRepository.findOne(id);

    return color;
  }

  public async findAll(): Promise<SizeProduct[] | undefined> {
    const allSizeProducts = await this.sizesProductsRepository.find();

    return allSizeProducts;
  }

  public async create(color: ISizeProductDTO): Promise<SizeProduct> {
    const newSizeProduct = this.sizesProductsRepository.create(color);

    await this.sizesProductsRepository.save(newSizeProduct);

    return newSizeProduct;
  }

  public async save(item: SizeProduct): Promise<SizeProduct> {
    return this.sizesProductsRepository.save(item);
  }
}

export default SizesProductsRepository;
