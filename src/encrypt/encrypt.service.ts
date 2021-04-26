import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt"

@Injectable()
export class EncryptService {
  async encryptData(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds)
  }

  async compareData(data: string, hash:string): Promise<boolean> {
    return await bcrypt.compare(data, hash)
  }
}
