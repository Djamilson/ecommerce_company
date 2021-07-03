import { getRepository, Raw, Repository } from 'typeorm';

import ICreatePriceDTO from '@modules/prices/dtos/ICreatePriceDTO';
import IPriceDTO from '@modules/prices/dtos/IPriceDTO';
import ITotalPriceDTO from '@modules/prices/dtos/ITotalPriceDTO';
import IPricesRepository from '@modules/prices/repositories/IPricesRepository';

import Price from '../entities/Price';

class PricesRepository implements IPricesRepository {
  private ormPriceRepository: Repository<Price>;

  constructor() {
    this.ormPriceRepository = getRepository(Price);
  }

  public async findAllPricePagination(
    object: IPriceDTO,
  ): Promise<ITotalPriceDTO> {
    const { page, pageSize, query } = object;

    const [result, total] = await this.ormPriceRepository.findAndCount({
      where: {
        price: Raw(alias => `${alias} ILIKE '${query}'`),
      },
      order: { price: 'ASC' },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return { result, total };
  }

  public async findAll(): Promise<Price[] | undefined> {
    const findAllPrices = await this.ormPriceRepository.find();

    return findAllPrices;
  }

  public async findByPrice(price: number): Promise<Price | undefined> {
    const newPrice = await this.ormPriceRepository.findOne({
      price,
    });

    return newPrice;
  }

  public async findById(id: string): Promise<Price | undefined> {
    const price = await this.ormPriceRepository.findOne(id);

    return price;
  }

  public async create(price: ICreatePriceDTO): Promise<Price> {
    const newPrice = this.ormPriceRepository.create(price);

    await this.ormPriceRepository.save(newPrice);

    return newPrice;
  }

  public async save(price: Price): Promise<Price> {
    return this.ormPriceRepository.save(price);
  }

  public async delete(id: string): Promise<void> {
    await this.ormPriceRepository.delete(id);
  }
}

export default PricesRepository;
