import Price from '../infra/typeorm/entities/Price';

export default interface ITotalPriceDTO {
  result: Price[];
  total: number;
}
