export interface IJwtAdapter {
  generateToken(payload: string): string;
}
