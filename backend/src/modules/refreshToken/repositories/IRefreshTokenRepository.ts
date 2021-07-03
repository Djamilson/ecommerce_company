import ICreateRefreshTokenDTO from '../dtos/ICreateRefreshTokenDTO';

export default interface IRefreshTokenRepository {
  findByUserIdAndRefreshToken(data: ICreateRefreshTokenDTO): Promise<void>;
  // create(data: ICreateRefreshTokenDTO): Promise<Re>;
  // save(price: Price): Promise<Price>;
  // delete(id: string): Promise<void>;
}
