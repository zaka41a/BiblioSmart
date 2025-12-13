import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-this';

// Payload interface matching the application structure
export interface JWTPayload {
  sub: string;  // User ID (subject)
  role: string; // User role (ADMIN, USER)
  iat?: number; // Issued at
  exp?: number; // Expiration
}

/**
 * Sign an access token with custom expiration
 * @param payload - Token payload with sub and role
 * @param expiresIn - Expiration time (e.g., '45m', '1h')
 * @returns Signed JWT token
 */
export const signAccessToken = (payload: JWTPayload, expiresIn = '45m'): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Sign a refresh token with 14 days expiration
 * @param payload - Token payload with sub and role
 * @returns Signed JWT refresh token
 */
export const signRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '14d' });
};

/**
 * Verify and decode an access token
 * @param token - JWT token to verify
 * @returns Decoded payload
 * @throws Error if token is invalid or expired
 */
export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Verify and decode a refresh token
 * @param token - JWT refresh token to verify
 * @returns Decoded payload
 * @throws Error if token is invalid or expired
 */
export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
