import { JwtAuthGuard } from '../../../../shared/guard/jwtAuth.guard';
import { GetUserService } from './../../useCases/GetUser.service';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateUserService } from '../../useCases/CreateUser.service';
import { Response } from 'express';
import { User } from '../typeorm/models/User';

@Controller('/user')
export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly getUser: GetUserService,
  ) {}

  @Post('/')
  @HttpCode(201)
  async create(
    @Body() createUser: ICreateUserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.createUser.create(createUser);

    return response.json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(
    @Param() params: string,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.getUser.getById(params);

    return response.json(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile/teste')
  async showProfile(
    @Request() req,
    @Res() response: Response,
  ): Promise<Response> {
    const showUser = await this.getUser.getById(req.user.id);

    return response.json(showUser);
  }
}
