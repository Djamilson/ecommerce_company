import { CountColorSizeProduct } from '../infra/typeorm/entities/CountColorSizeProduct';

export default interface ITotalCountColorSizeProductDTO {
  result: CountColorSizeProduct[];
  total: number;
}
