import crypto from 'crypto';
import { IUser } from '../models/userModel';
import { JWTUtils } from '../utils/jwtUlti';
import { AuthToken } from '../typeDefs/authType';
import { Secret } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class AuthenticationService {
  public async createToken(user: IUser): Promise<AuthToken> {
    const payload = {
      uid: user.uid,
      email: user.email,
      role: user.role,
    };
    const accessToken = JWTUtils.signAsync(
      payload,
      process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );
    const refreshToken = JWTUtils.signAsync(
      { uid: user.uid },
      process.env.JWT_SECRET as Secret,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  public async hashPassword(password: string): Promise<String>{
    const salt = crypto.randomBytes(10).toString('hex');
    const interations = process.env.INTERATIONS
      ? Number(process.env.INTERATIONS)
      : 10;
    const passwordLenght = process.env.PASSWORD_LENGHT
      ? Number(process.env.PASSWORD_LENGHT)
      : 15;
    const digest = process.env.DIGEST ? process.env.DIGEST : 'sha512';
    return (
      salt +
      '+' +
      crypto
        .pbkdf2Sync(password, salt, interations, passwordLenght, digest)
        .toString('hex')
    );
  }
  public async compare(plainPassword: string, hash: string): Promise<Boolean> {
    const interations = process.env.INTERATIONS
      ? Number(process.env.INTERATIONS)
      : 10;
    const passwordLenght = process.env.PASSWORD_LENGHT
      ? Number(process.env.PASSWORD_LENGHT)
      : 15;
    const digest = process.env.DIGEST ? process.env.DIGEST : 'sha512';
    const [salt, key] = hash.split('+');
    const verifyPassword = crypto
      .pbkdf2Sync(plainPassword, salt, interations, passwordLenght, digest)
      .toString('hex');
    return verifyPassword == key;
  }
}

