import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class IAuthenticateUserDTO {
  @IsEmail({}, { message: 'Precisa informar um email valido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}

export { IAuthenticateUserDTO };
