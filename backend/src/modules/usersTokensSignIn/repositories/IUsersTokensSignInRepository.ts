import IByUserIdAndRefreshTokenDTO from '../dtos/IByUserIdAndRefreshTokenDTO';
import ICreateUsersTokensSignInDTO from '../dtos/ICreateUsersTokensSignInDTO';
import UsersTokensSignIn from '../infra/typeorm/entities/UsersTokenSignIn';

export default interface IUsersTokensSignInRepository {
  findByIdUserId(user_id: string): Promise<UsersTokensSignIn[]>;
  findByUserIdAndRefreshToken(
    byUserIdAndRefreshTokenDTO: IByUserIdAndRefreshTokenDTO,
  ): Promise<UsersTokensSignIn | undefined>;

  findById(id: string): Promise<UsersTokensSignIn | undefined>;
  create(data: ICreateUsersTokensSignInDTO): Promise<UsersTokensSignIn>;
  save(usersTokensSignIn: UsersTokensSignIn): Promise<UsersTokensSignIn>;
  delete(id: string): Promise<void>;
}
