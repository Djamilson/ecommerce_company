import { sign, verify } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

// import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IGroupsRepository from '@modules/users/repositories/IGroupsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersTokensSignInRepository from '@modules/usersTokensSignIn/repositories/IUsersTokensSignInRepository';

import authConfig from '@config/auth';

import { IDateProvider } from '@shared/container/providers/implementations/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface IUserSerializable {
  id?: string;
  is_verified?: boolean;
  roles?: string[];
  firstName?: string;
  person: {
    phone_id_main?: string;
    address_id_main?: string;
    id?: string;
    name?: string;
    email?: string;
    status?: boolean;
    privacy?: boolean;
    avatar?: string;
    avatar_url?: () => string | null;
  };
}

interface ITokenResponse {
  user: IUserSerializable;
  token: string;
  refreshToken: string;
}

@injectable()
class CreateRefreshTokenService {
  constructor(
    @inject('UsersTokensSignInRepository')
    private usersTokensSignInRepository: IUsersTokensSignInRepository,

    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  public async execute(token: string): Promise<ITokenResponse> {
    const {
      secretToken,
      expiresInToken,
      expiresInRefreshToken,
      secretRefreshToken,
      expiresRefreshTokenDays,
    } = authConfig.jwt;

    const { email, sub } = verify(token, secretRefreshToken) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensSignInRepository.findByUserIdAndRefreshToken(
      {
        user_id,
        token,
      },
    );

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }
    await this.usersTokensSignInRepository.delete(userToken.id);

    const refresh_token = sign({ email }, expiresInToken, {
      subject: sub,
      expiresIn: expiresInRefreshToken,
    });

    const expires_date = this.dayjsDateProvider.addDays(
      expiresRefreshTokenDays,
    );

    await this.usersTokensSignInRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const userOut = await this.usersRepository.findByEmail(email);

    const groups = userOut?.user_groups.map(group => {
      return { id: group.group_id };
    });

    let listgroup;
    let roles;

    if (groups) {
      listgroup = await this.groupsRepository.findAllById(groups);

      roles = listgroup?.map(role => {
        return role.description;
      });
    }

    const newToken = sign({ roles }, secretToken, {
      subject: user_id,
      expiresIn: expiresInToken,
    });

    const user = {
      id: userOut?.id,
      is_verified: userOut?.is_verified,
      roles,
      firstName: userOut?.person.name.split(' ')[0],

      person: {
        id: userOut?.person.id,
        name: userOut?.person.name,
        email: userOut?.person.email,
        status: userOut?.person.status,
        privacy: userOut?.person.privacy,
        avatar: userOut?.person.avatar,
        phone_id_main: userOut?.person.phone_id_main,
        address_id_main: userOut?.person.address_id_main,
        avatar_url: userOut?.person.getAvatarUrl,
      },
    };

    return { user, refreshToken: refresh_token, token: newToken };
  }
}

export default CreateRefreshTokenService;
