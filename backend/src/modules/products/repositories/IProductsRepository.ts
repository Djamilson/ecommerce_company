import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IPaginationDTO from '../dtos/IPaginationDTO';
import IPaginationsDTO from '../dtos/IPaginationsDTO';
import ITotalProductDTO from '../dtos/ITotalProductDTO';
import Product from '../infra/typeorm/entities/Product';

interface IProduct {
  itemProduct: {
    stock: number;
    product: {
      id: string;
      price: number;
      name: string;
    };
  };
}

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findAllById(products: IProduct[]): Promise<Product[]>;
  findAll(paginationDTO: IPaginationsDTO): Promise<Product[]>;
  findAllPagination(object: IPaginationDTO): Promise<ITotalProductDTO>;
  findByName(name: string): Promise<Product | undefined>;

  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
}
