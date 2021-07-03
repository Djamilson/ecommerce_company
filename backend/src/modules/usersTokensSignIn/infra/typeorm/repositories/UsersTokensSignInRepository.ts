import { getRepository, Repository } from 'typeorm';

import IByUserIdAndRefreshTokenDTO from '@modules/usersTokensSignIn/dtos/IByUserIdAndRefreshTokenDTO';
import ICreateUsersTokensSignInDTO from '@modules/usersTokensSignIn/dtos/ICreateUsersTokensSignInDTO';
import IUsersTokensSignInRepository from '@modules/usersTokensSignIn/repositories/IUsersTokensSignInRepository';

import UsersTokensSignIn from '../entities/UsersTokenSignIn';

class UsersTokensSignInRepository implements IUsersTokensSignInRepository {
  private ormUsersTokensSignInRepository: Repository<UsersTokensSignIn>;

  constructor() {
    this.ormUsersTokensSignInRepository = getRepository(UsersTokensSignIn);
  }

  public async findById(id: string): Promise<UsersTokensSignIn | undefined> {
    const userTokenSignIn = await this.ormUsersTokensSignInRepository.findOne(
      id,
    );

    return userTokenSignIn;
  }

  public async findByIdUserId(user_id: string): Promise<UsersTokensSignIn[]> {
    const usersTokensSignIns = await this.ormUsersTokensSignInRepository.find({
      user_id,
    });

    return usersTokensSignIns;
  }

  public async findByUserIdAndRefreshToken({
    token,
    user_id,
  }: IByUserIdAndRefreshTokenDTO): Promise<UsersTokensSignIn | undefined> {
    const usersTokensSignIns = await this.ormUsersTokensSignInRepository.findOne(
      {
        user_id,
        refresh_token: token,
      },
    );

    return usersTokensSignIns;
  }

  public async create(
    usersTokensSignIn: ICreateUsersTokensSignInDTO,
  ): Promise<UsersTokensSignIn> {
    const userToken = this.ormUsersTokensSignInRepository.create(
      usersTokensSignIn,
    );

    await this.ormUsersTokensSignInRepository.save(userToken);

    return userToken;
  }

  public async save(
    usersTokensSignIn: UsersTokensSignIn,
  ): Promise<UsersTokensSignIn> {
    return this.ormUsersTokensSignInRepository.save(usersTokensSignIn);
  }

  public async delete(id: string): Promise<void> {
    await this.ormUsersTokensSignInRepository.delete(id);
  }
}

export default UsersTokensSignInRepository;
