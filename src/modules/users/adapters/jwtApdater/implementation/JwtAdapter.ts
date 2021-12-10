import { Injectable } from '@nestjs/common';
import { IJwtAdapter } from './../models/IJwtAdapter';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements IJwtAdapter {
  constructor(private jwtService: JwtService) {}
  generateToken(id: string): string {
    const payload: JwtSignOptions = {
      subject: id,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
