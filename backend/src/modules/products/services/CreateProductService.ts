import { injectable, inject } from 'tsyringe';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import IPricesRepository from '@modules/prices/repositories/IPricesRepository';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  description: string;
  section_id: string;
  brand_id: string;
  user_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,
  ) {}

  public async execute({
    name,
    price,
    description,
    brand_id,
    section_id,
    user_id,
  }: IRequest): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    if (brand_id) {
      const checkBranchExists = await this.brandsRepository.findById(brand_id);

      if (!checkBranchExists) {
        throw new AppError('Brand not exist.', 404);
      }
    }

    const product = await this.productsRepository.create({
      name,
      description,
      brand_id,
      section_id,
    });

    const newPrice = await this.pricesRepository.create({
      price,
      user_id,
    });

    product.price = newPrice;

    return this.productsRepository.save(product);
  }
}

export default CreateProductService;
