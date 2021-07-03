import { CountColorSizeProduct } from '@modules/products/infra/typeorm/entities/CountColorSizeProduct';

import ICreateCCSProductDTO from '../dtos/ICreateCCSProductDTO';
import IPaginationDTO from '../dtos/IPaginationDTO';
import ITotalCountColorSizeProductDTO from '../dtos/ITotalCountColorSizeProductDTO';
import IUpdateProductsQuantityDTO from '../dtos/IUpdateStocksQuantityDTO';

interface ICountColorSizeProduct {
  itemProduct: {
    stock: number;
    product: {
      id: string;
      price: number;
      name: string;
    };
  };
}

export default interface ICountsColorsSizesProductsRepository {
  findAllById(
    countsColorsSizesProducts: ICountColorSizeProduct[],
  ): Promise<CountColorSizeProduct[]>;

  findAllCountColorSizeProductPagination(
    object: IPaginationDTO,
  ): Promise<ITotalCountColorSizeProductDTO>;

  updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<CountColorSizeProduct[]>;

  findById(id: string): Promise<CountColorSizeProduct | undefined>;

  findBySku(sku: string): Promise<CountColorSizeProduct | undefined>;
  findByBarCode(bar_code: string): Promise<CountColorSizeProduct | undefined>;

  create(data: ICreateCCSProductDTO): Promise<CountColorSizeProduct>;
  save(
    countColorSizeProduct: CountColorSizeProduct,
  ): Promise<CountColorSizeProduct>;
}
