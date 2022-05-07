import { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

export class JWTUtils {
  static verifyAsync(token: string, key: Secret, options?: VerifyOptions) {
    return jwt.verify(token, key, options);
  }
  static signAsync(payload: any, key: Secret, options?: SignOptions) {
    return jwt.sign(payload, key, options);
  }
}
