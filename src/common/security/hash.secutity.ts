import { compareSync, hashSync } from 'bcrypt';

export const generateHash = (
  plainText: string,
  salt: number = parseInt(process.env.SALT as string, 10),
): string => {
  if (isNaN(salt)) {
    throw new Error('Invalid salt value');
  }
  return hashSync(plainText, salt);
};

export const compareHash = (plainText: string, hashValue: string): boolean => {
  return compareSync(plainText, hashValue);
};
