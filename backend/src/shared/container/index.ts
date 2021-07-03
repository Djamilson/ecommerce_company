import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import BrandsRepository from '@modules/brands/infra/typeorm/repositories/BrandsRepository';
import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import CitiesRepository from '@modules/locality/infra/typeorm/repositories/CitiesRepository';
import StatesRepository from '@modules/locality/infra/typeorm/repositories/StatesRepository';
import ICitiesRepository from '@modules/locality/repositories/ICitiesRepository';
import IStatesRepository from '@modules/locality/repositories/IStatesRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import PricesRepository from '@modules/prices/infra/typeorm/repositories/PricesRepository';
import IPricesRepository from '@modules/prices/repositories/IPricesRepository';
import ColorsRepository from '@modules/products/infra/typeorm/repositories/ColorsRepository';
import CountsColorsSizesProductsRepository from '@modules/products/infra/typeorm/repositories/CountsColorsSizesProductsRepository';
import PhotosRepository from '@modules/products/infra/typeorm/repositories/PhotosRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import SizesProductsRepository from '@modules/products/infra/typeorm/repositories/SizesProductsRepository';
import IColorsRepository from '@modules/products/repositories/IColorsRepository';
import ICountsColorsSizesProductsRepository from '@modules/products/repositories/ICountsColorsSizesProductsRepository';
import IPhotosRepository from '@modules/products/repositories/IPhotosRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ISizesProductsRepository from '@modules/products/repositories/ISizesProductsRepository';
import SectionsRepository from '@modules/sections/infra/typeorm/repositories/SectionsRepository';
import ISectionsRepository from '@modules/sections/repositories/ISectionsRepository';
import AddressesRepository from '@modules/users/infra/typeorm/repositories/AddressesRepository';
import GroupsRepository from '@modules/users/infra/typeorm/repositories/GroupsRepository';
import PersonsRepository from '@modules/users/infra/typeorm/repositories/PersonsRepository';
import PhonesRepository from '@modules/users/infra/typeorm/repositories/PhonesRepository';
import UsersGroupsRepository from '@modules/users/infra/typeorm/repositories/UsersGroupsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import IPhonesRepository from '@modules/users/repositories/IPhonesRepository';
import IUsersGroupsRepository from '@modules/users/repositories/IUsersGroupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UsersTokensSignInRepository from '@modules/usersTokensSignIn/infra/typeorm/repositories/UsersTokensSignInRepository';
import IUsersTokensSignInRepository from '@modules/usersTokensSignIn/repositories/IUsersTokensSignInRepository';

import DayjsDateProvider from './providers/implementations/DayjsDateProvider';
import { IDateProvider } from './providers/implementations/IDateProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);

container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository,
);
container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
);

container.registerSingleton<IUsersGroupsRepository>(
  'UsersGroupsRepository',
  UsersGroupsRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IGroupsRepository>(
  'GroupsRepository',
  GroupsRepository,
);

container.registerSingleton<IUsersTokensSignInRepository>(
  'UsersTokensSignInRepository',
  UsersTokensSignInRepository,
);

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<ISectionsRepository>(
  'SectionsRepository',
  SectionsRepository,
);

container.registerSingleton<IBrandsRepository>(
  'BrandRepository',
  BrandsRepository,
);

container.registerSingleton<IPricesRepository>(
  'PricesRepository',
  PricesRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<ICountsColorsSizesProductsRepository>(
  'CountsColorsSizesProductsRepository',
  CountsColorsSizesProductsRepository,
);

container.registerSingleton<IPhotosRepository>(
  'PhotosRepoitory',
  PhotosRepository,
);

container.registerSingleton<IColorsRepository>(
  'ColorsRepoitory',
  ColorsRepository,
);

container.registerSingleton<ISizesProductsRepository>(
  'SizesProductsRepoitory',
  SizesProductsRepository,
);
