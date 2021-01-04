import jwt from 'jsonwebtoken';

/* defining the cookie attributes */
export const cookieOptions = {
  maxAge: 60 * 60, // 1 hour
  secure: process.env.NODE_ENV === 'production', // set `true` for https only
  path: '/', // send the cookie on all requests
  httpOnly: true, // makes cookie inaccessible from browser (only transferred through http requests, and protects against XSS attacks)
  sameSite: 'strict', // cookie can only be sent from the same domain
};

const jwtOptions = {
  algorithm: 'HS512',
  expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
};

export function decryptCookie(cookie) {
  return jwt.verify(cookie, process.env.ENCRYPTION_SECRET, jwtOptions);
}

export function encryptCookie(userMetadata) {
  return jwt.sign(userMetadata, process.env.ENCRYPTION_SECRET, jwtOptions);
}
