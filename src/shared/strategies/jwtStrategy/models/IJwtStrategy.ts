import { User } from './../../../../modules/users/infra/typeorm/models/User';
export interface IRequest {
  sub: string;
  username: string;
}

export interface IJwtStrategy {
  validate(payload: IRequest): Promise<User>;
}
