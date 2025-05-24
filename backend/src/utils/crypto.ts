import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY environment variable is not defined');
}
const SECRET_KEY = process.env.SECRET_KEY; // Must be 32 bytes for aes-256
const IV_LENGTH = 16;

const KEY = crypto.createHash('sha256').update(SECRET_KEY).digest(); // 32 bytes

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(encryptedText: string): string {
    const [ivHex, encryptedHex] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
}
