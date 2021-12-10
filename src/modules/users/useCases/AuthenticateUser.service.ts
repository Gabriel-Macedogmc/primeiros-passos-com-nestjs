import { IJwtAdapter } from './../adapters/jwtApdater/models/IJwtAdapter';
import { IUserRepository } from './../repositories/IUserRepository';
import { UserRepository } from './../infra/typeorm/repositories/UserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infra/typeorm/models/User';
import { IAuthenticateUserDTO } from '../dtos/IAuthenticateUserDTO';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IHashAdapter } from '../adapters/hashAdapter/models/IHashAdapter';

interface IResponse {
  user: User;
  token: string;
}

export class AuthenticateUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('TokenAdapter')
    private readonly tokenAdapter: IJwtAdapter,
    @Inject('HashAdapter')
    private readonly hashAdapter: IHashAdapter,
  ) {}
  async login(data: IAuthenticateUserDTO): Promise<IResponse> {
    const user = await this.userRepository.getByEmail(data.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const isMatch = await this.hashAdapter.decrypt(
      data.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Email/Senha incorretos');
    }

    return {
      user,
      token: this.tokenAdapter.generateToken(user.id),
    };
  }
}
