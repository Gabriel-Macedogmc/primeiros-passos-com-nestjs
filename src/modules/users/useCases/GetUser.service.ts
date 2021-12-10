import { UserRepository } from './../infra/typeorm/repositories/UserRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infra/typeorm/models/User';
import { IUserRepository } from '../repositories/IUserRepository';

@Injectable()
export class GetUserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IUserRepository,
  ) {}
  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
