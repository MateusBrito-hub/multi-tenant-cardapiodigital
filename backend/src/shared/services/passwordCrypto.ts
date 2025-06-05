import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RANDOM = 7;
const hashPassword = async (password : string) => {
    const saltGeneretion = await genSalt(SALT_RANDOM);

    return await hash(password, saltGeneretion);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
};


export const passwordCrypto = {
    hashPassword, 
    verifyPassword
};