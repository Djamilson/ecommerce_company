import { getRepository, Repository, In, Like, Brackets } from 'typeorm';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IPaginationDTO from '@modules/products/dtos/IPaginationDTO';
import IPaginationsDTO from '@modules/products/dtos/IPaginationsDTO';
import ITotalProductDTO from '@modules/products/dtos/ITotalProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '../entities/Product';

interface IProduct {
  itemProduct: {
    stock: number;
    product: {
      id: string;
      name: string;
      price: number;
    };
  };
}
class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAllById(products: IProduct[]): Promise<Product[]> {
    const productIds = products.map(item => item.itemProduct.product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }

  public async findAll(paginationDTO: IPaginationsDTO): Promise<Product[]> {
    // /para a busca
    const keyword = '';

    const products = await this.ormRepository.find({
      where: { name: Like(`%${keyword}%`) },
      order: { name: 'DESC' },
      ...paginationDTO,
    });

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllPagination(
    object: IPaginationDTO,
  ): Promise<ITotalProductDTO> {
    const { page, pageSize, query } = object;

    const [result, total] = await this.ormRepository.findAndCount({
      where: (qb: any) => {
        qb.where(
          new Brackets((qbs: any) => {
            qbs.where('Product__product.name ilike :name', {
              name: `${query}`,
            });
          }),
        ).andWhere(
          new Brackets((qbs: any) => {
            qbs.where('Product__description ilike :description', {
              description: `${query}`,
            });
          }),
        );
      },
      relations: [
        'product',
        'price',
        'product.section',
        'product.brand',
        'count_color_size_products',
        'count_color_size_products.photos',
      ],
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return { result, total };
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);
    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
