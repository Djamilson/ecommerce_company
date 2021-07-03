import { Brackets, getRepository, In, Repository } from 'typeorm';

import ICreateCCSProductDTO from '@modules/products/dtos/ICreateCCSProductDTO';
import IPaginationDTO from '@modules/products/dtos/IPaginationDTO';
import ITotalCountColorSizeProductDTO from '@modules/products/dtos/ITotalCountColorSizeProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateStocksQuantityDTO';
import ICountsColorsSizesProductsRepository from '@modules/products/repositories/ICountsColorsSizesProductsRepository';

import { CountColorSizeProduct } from '../entities/CountColorSizeProduct';

interface IProduct {
  itemProduct: {
    stock: number;
    id: string;
    product: {
      id: string;
      name: string;
      price: number;
    };
  };
}

class CountsColorsSizesProductsRepository
  implements ICountsColorsSizesProductsRepository {
  private countColorSizeProductRepository: Repository<CountColorSizeProduct>;

  constructor() {
    this.countColorSizeProductRepository = getRepository(CountColorSizeProduct);
  }

  public async findAllById(
    countsColorsSizesProducts: IProduct[],
  ): Promise<CountColorSizeProduct[]> {
    const productIds = countsColorsSizesProducts.map(
      item => item.itemProduct.id,
    );

    const existsProducts = await this.countColorSizeProductRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }

  public async findById(
    id: string,
  ): Promise<CountColorSizeProduct | undefined> {
    const countColorSizeProduct = await this.countColorSizeProductRepository.findOne(
      id,
      {
        relations: ['color', 'sizeProduct', 'photos'],
      },
    );

    return countColorSizeProduct;
  }

  public async findBySku(
    sku: string,
  ): Promise<CountColorSizeProduct | undefined> {
    const product = await this.countColorSizeProductRepository.findOne({
      sku,
    });

    return product;
  }

  public async findByBarCode(
    bar_code: string,
  ): Promise<CountColorSizeProduct | undefined> {
    const product = await this.countColorSizeProductRepository.findOne({
      bar_code,
    });

    return product;
  }

  public async findAllCountColorSizeProductPagination(
    object: IPaginationDTO,
  ): Promise<ITotalCountColorSizeProductDTO> {
    const { page, pageSize, query } = object;

    const [
      result,
      total,
    ] = await this.countColorSizeProductRepository.findAndCount({
      where: (qb: any) => {
        qb.where(
          new Brackets((qbs: any) => {
            qbs.where('CountColorSizeProduct__product.name ilike :name', {
              name: `${query}`,
            });
          }),
        ).andWhere(
          new Brackets((qbs: any) => {
            qbs.where(
              'CountColorSizeProduct__product.description ilike :description',
              {
                description: `${query}`,
              },
            );
          }),
        );
      },
      relations: [
        'product',
        'price',
        'product.section',
        'product.brand',
        'photos',
      ],
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return { result, total };
  }

  public async create(
    item: ICreateCCSProductDTO,
  ): Promise<CountColorSizeProduct> {
    const countColorSizeProduct = this.countColorSizeProductRepository.create(
      item,
    );

    await this.countColorSizeProductRepository.save(countColorSizeProduct);

    return countColorSizeProduct;
  }

  public async save(
    item: CountColorSizeProduct,
  ): Promise<CountColorSizeProduct> {
    return this.countColorSizeProductRepository.save(item);
  }

  async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<CountColorSizeProduct[]> {
    return this.countColorSizeProductRepository.save(products);
  }
}

export default CountsColorsSizesProductsRepository;
