import { AuthenticateUserService } from './useCases/AuthenticateUser.service';
import { AuthenticateUserController } from './infra/controller/authenticateUser.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdapter } from './adapters/jwtApdater/implementation/JwtAdapter';
import { GetUserService } from './useCases/GetUser.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserService } from './useCases/CreateUser.service';
import { UserController } from './infra/controller/User.controller';
import { UserRepository } from './infra/typeorm/repositories/UserRepository';
import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/shared/strategies/jwtStrategy/Jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { HashAdapter } from './adapters/hashAdapter/implementation/hashAdapter';

@Module({
  controllers: [UserController, AuthenticateUserController],
  imports: [
    JwtModule.register({
      secret: '3h123h17ch7341d6t1dhby62dh23',
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [
    CreateUserService,
    GetUserService,
    AuthenticateUserService,
    JwtStrategy,
    {
      provide: 'TokenAdapter',
      inject: [JwtAdapter],
      useClass: JwtAdapter,
    },
    {
      provide: 'HashAdapter',
      inject: [HashAdapter],
      useClass: HashAdapter,
    },
  ],
})
export class UsersModule {}
