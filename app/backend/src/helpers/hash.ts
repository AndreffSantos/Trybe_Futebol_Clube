import { compareSync } from 'bcryptjs';

class Hash {
  validate(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}

export const hash = new Hash;