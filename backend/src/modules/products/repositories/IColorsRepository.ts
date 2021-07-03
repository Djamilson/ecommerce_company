import ICreateColorDTO from '../dtos/ICreateColorDTO';
import { Color } from '../infra/typeorm/entities/Color';

export default interface IColorsRepository {
  findById(id: string): Promise<Color | undefined>;
  findAll(): Promise<Color[] | undefined>;

  create(color: ICreateColorDTO): Promise<Color>;
  save(color: Color): Promise<Color>;
}
