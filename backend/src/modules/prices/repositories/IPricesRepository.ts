import ICreatePriceDTO from '../dtos/ICreatePriceDTO';
import IPriceDTO from '../dtos/IPriceDTO';
import ITotalPriceDTO from '../dtos/ITotalPriceDTO';
import Price from '../infra/typeorm/entities/Price';

export default interface IPricesRepository {
  findAllPricePagination(object: IPriceDTO): Promise<ITotalPriceDTO>;

  findAll(): Promise<Price[] | undefined>;
  findById(id: string): Promise<Price | undefined>;
  findByPrice(price: number): Promise<Price | undefined>;
  create(data: ICreatePriceDTO): Promise<Price>;
  save(price: Price): Promise<Price>;
  delete(id: string): Promise<void>;
}
