import Price from '../infra/typeorm/entities/Price';

export default interface IPaginatedPricesDTO {
  data: Price[];
  page: number;
  limit: number;
  totalCount: number;
}
