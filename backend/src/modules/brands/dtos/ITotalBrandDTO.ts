import Brand from '../infra/typeorm/entities/Brand';

export default interface ITotalBrandDTO {
  result: Brand[];
  total: number;
}
