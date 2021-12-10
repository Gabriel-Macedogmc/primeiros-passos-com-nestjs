import { ICreateUserDTO } from 'src/modules/users/dtos/ICreateUserDTO';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { IUserRepository } from '../../../repositories/IUserRepository';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  public async getByEmail(email: string): Promise<User> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }

  public async createAndSave(data: ICreateUserDTO): Promise<User> {
    const user = this.create(data);

    await this.save(user);

    return user;
  }

  public async getById(userId: string): Promise<User> {
    const user = await this.findOne(userId);

    return user;
  }
}
