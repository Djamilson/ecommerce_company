import Brand from '../infra/typeorm/entities/Brand';

export default interface IPaginatedBrandsDTO {
  data: Brand[];
  page: number;
  limit: number;
  totalCount: number;
}
