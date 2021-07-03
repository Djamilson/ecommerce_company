import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

import ICompaniesProductsRepository from '../../companiesProducts/repositories/ICompaniesProductsRepository';
import IUsersCompaniesRepository from '../../usersCompanies/repositories/IUsersCompaniesRepository';
import Price from '../infra/typeorm/entities/Price';
import IPricesRepository from '../repositories/IPricesRepository';

interface IResponse {
  price: number;
  company_product_id: string;
  user_id: string;
}

@injectable()
class CreatePriceService {
  constructor(
    @inject('PricesRepository')
    private pricesRepository: IPricesRepository,

    @inject('CompaniesProductsRepository')
    private companiesProductsRepository: ICompaniesProductsRepository,

    @inject('UsersCompaniesRepository')
    private usersCompaniesRepository: IUsersCompaniesRepository,
  ) {}

  public async execute({
    price,
    company_product_id,
    user_id,
  }: IResponse): Promise<Price> {
    const checkCompanyProductExists = await this.companiesProductsRepository.findById(
      company_product_id,
    );

    if (!checkCompanyProductExists) {
      throw new AppError('CompanyProduct not exist .', 401);
    }

    const checkUserCompanyExists = await this.usersCompaniesRepository.findByUserIdAndCompanyId(
      {
        user_id,
        company_id: checkCompanyProductExists.company_id,
      },
    );

    if (!checkUserCompanyExists) {
      throw new AppError('User not cad company exist.', 401);
    }

    const newPrice = await this.pricesRepository.create({
      price,
      company_product_id,
      user_company_id: checkUserCompanyExists.id,
    });

    checkCompanyProductExists.price = newPrice;

    this.companiesProductsRepository.save(checkCompanyProductExists);

    return newPrice;
  }
}

export default CreatePriceService;
