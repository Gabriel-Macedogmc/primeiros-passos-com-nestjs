import { IsEmail } from 'class-validator';

export class ICreateUserDTO {
  name: string;
  @IsEmail()
  email: string;
  password: string;
}
