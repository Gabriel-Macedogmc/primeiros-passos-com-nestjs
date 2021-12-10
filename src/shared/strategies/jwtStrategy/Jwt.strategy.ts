import { User } from './../../../modules/users/infra/typeorm/models/User';
import { IUserRepository } from './../../../modules/users/repositories/IUserRepository';
import { UserRepository } from './../../../modules/users/infra/typeorm/repositories/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtStrategy, IRequest } from './models/IJwtStrategy';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements IJwtStrategy
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '3h123h17ch7341d6t1dhby62dh23',
    });
  }
  async validate(payload: IRequest): Promise<User> {
    const user = await this.userRepository.getById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Acesso invalido');
    }

    return user;
  }
}
