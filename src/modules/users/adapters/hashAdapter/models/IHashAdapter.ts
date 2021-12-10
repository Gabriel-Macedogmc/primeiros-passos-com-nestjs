export interface IHashAdapter {
  crypt(payload: string, salt?: number): Promise<string>;
  decrypt(payload: string, hash: string): Promise<boolean>;
}
