import { sign, SignOptions, VerifyOptions, verify } from 'jsonwebtoken';

export const generateToken = (payload: any) => {
  const privateKey = process.env.PRIVATE_KEY as string;
  const expiryTime = process.env.EXPIRY_TIME as string;

  const signInOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: expiryTime
  };

  // generate JWT
  return sign(payload, privateKey, signInOptions);
};

export function validateToken(token: string) {
  const publicKey = process.env.PRIVATE_KEY as string;

  const verifyOptions: VerifyOptions = {
    algorithms: ['HS256']
  };

  return verify(token, publicKey, verifyOptions);
}
