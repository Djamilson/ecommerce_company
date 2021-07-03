import Product from '../infra/typeorm/entities/Product';

export default interface ITotalProductDTO {
  result: Product[];
  total: number;
}
