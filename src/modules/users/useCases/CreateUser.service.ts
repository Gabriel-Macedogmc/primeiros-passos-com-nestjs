import { IHashAdapter } from './../adapters/hashAdapter/models/IHashAdapter';
import { IUserRepository } from '../repositories/IUserRepository';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../infra/typeorm/models/User';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject('HashAdapter')
    private readonly hashAdapter: IHashAdapter,
  ) {}
  async create(data: ICreateUserDTO): Promise<User> {
    const userExist = await this.userRepository.getByEmail(data.email);

    if (userExist) {
      throw new UnauthorizedException('Email já Cadastrado');
    }

    const newPassword = await this.hashAdapter.crypt(data.password, 9);

    const user = await this.userRepository.createAndSave({
      ...data,
      password: newPassword,
    });

    return user;
  }
}
