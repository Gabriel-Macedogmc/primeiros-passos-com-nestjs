import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { AuthenticateUserService } from './../../useCases/AuthenticateUser.service';
@Controller('session')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserService,
  ) {}
  @Post()
  public async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { email, password }: IAuthenticateUserDTO = request.body;

    const session = await this.authenticateUserUseCase.login({
      email,
      password,
    });

    return response.status(200).json(session);
  }
}
