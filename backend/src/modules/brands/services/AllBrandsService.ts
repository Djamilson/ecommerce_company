import { inject, injectable } from 'tsyringe';

import IBrandsRepository from '../repositories/IBrandsRepository';

interface IBrand {
  id: string;
  name: string;
  image: string;
}
@injectable()
class ListBrandsService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute(): Promise<IBrand[] | undefined> {
    const brands = await this.brandsRepository.findAll();

    return brands;
  }
}

export default ListBrandsService;
