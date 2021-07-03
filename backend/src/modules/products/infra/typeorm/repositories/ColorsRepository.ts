import { getRepository, Repository } from 'typeorm';

import ICreateColorDTO from '@modules/products/dtos/ICreateColorDTO';
import IColorsRepository from '@modules/products/repositories/IColorsRepository';

import { Color } from '../entities/Color';

class ColorsRepository implements IColorsRepository {
  private colorsRepository: Repository<Color>;

  constructor() {
    this.colorsRepository = getRepository(Color);
  }

  public async findById(id: string): Promise<Color | undefined> {
    const color = await this.colorsRepository.findOne(id);

    return color;
  }

  public async findAll(): Promise<Color[] | undefined> {
    const allColors = await this.colorsRepository.find();

    return allColors;
  }

  public async create(color: ICreateColorDTO): Promise<Color> {
    const newColor = this.colorsRepository.create(color);

    return this.colorsRepository.save(newColor);
  }

  public async save(item: Color): Promise<Color> {
    return this.colorsRepository.save(item);
  }

  public async delete(id: string): Promise<void> {
    await this.colorsRepository.delete(id);
  }
}

export default ColorsRepository;
