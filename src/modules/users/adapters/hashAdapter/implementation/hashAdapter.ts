import { Injectable } from '@nestjs/common';
import { IHashAdapter } from './../models/IHashAdapter';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashAdapter implements IHashAdapter {
  async crypt(payload: string, salt?: number): Promise<string> {
    const hash = await bcrypt.hash(payload, salt);

    return hash;
  }

  async decrypt(payload: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(payload, hash);

    return isMatch;
  }
}
