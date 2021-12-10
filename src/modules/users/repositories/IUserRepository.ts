import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/models/User';

export interface IUserRepository {
  createAndSave(data: ICreateUserDTO): Promise<User>;
  getById(userId: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
}
