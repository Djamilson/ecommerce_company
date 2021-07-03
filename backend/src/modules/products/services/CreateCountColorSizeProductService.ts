import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { CountColorSizeProduct } from '../infra/typeorm/entities/CountColorSizeProduct';
import IColorsRepository from '../repositories/IColorsRepository';
import ICountsColorsSizesProductsRepository from '../repositories/ICountsColorsSizesProductsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import ISizesProductsRepository from '../repositories/ISizesProductsRepository';

interface IRequest {
  stock: number;
  sku: string;

  size_product_id: string;
  thumbnail?: string;
  bar_code?: string;
  color_id: string;
  user_id: string;
  product_id: string;
}

@injectable()
class CreateCountColorSizeProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ColorsRepository')
    private colorsRepository: IColorsRepository,

    @inject('SizesProductsRepository')
    private sizesProductsRepository: ISizesProductsRepository,

    @inject('CountsColorsSizesProdructsRepository')
    private countsColorsSizesProdructsRepository: ICountsColorsSizesProductsRepository,
  ) {}

  public async execute({
    stock,
    sku,
    color_id,
    size_product_id,
    thumbnail,
    bar_code,
    user_id,
    product_id,
  }: IRequest): Promise<CountColorSizeProduct> {
    const productExists = await this.productsRepository.findById(product_id);

    if (!productExists) {
      throw new AppError('Product not exists');
    }

    const colorsExists = await this.colorsRepository.findById(color_id);

    if (!colorsExists) {
      throw new AppError('Color not exists');
    }

    const sizesProductsExists = await this.sizesProductsRepository.findById(
      size_product_id,
    );

    if (!sizesProductsExists) {
      throw new AppError('SizeProduct not exists');
    }

    if (bar_code !== null && bar_code !== undefined) {
      const oldProduct = await this.countsColorsSizesProdructsRepository.findByBarCode(
        bar_code,
      );

      if (oldProduct && oldProduct.bar_code === bar_code) {
        throw new AppError('Product already in use.', 402);
      }
    }

    const skuExists = await this.countsColorsSizesProdructsRepository.findBySku(
      sku,
    );

    if (skuExists) {
      throw new AppError('SKU already in use.', 402);
    }

    const product = await this.countsColorsSizesProdructsRepository.create({
      stock,
      sku,
      color_id,
      size_product_id,
      thumbnail,
      bar_code,
      user_id,
      product_id,
    });

    return this.countsColorsSizesProdructsRepository.save(product);
  }
}

export { CreateCountColorSizeProductService };
