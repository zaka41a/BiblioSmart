export interface JWTPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function signAccessToken(payload: JWTPayload, expiresIn?: string): string;
export function signRefreshToken(payload: JWTPayload): string;
export function verifyAccessToken(token: string): JWTPayload;
export function verifyRefreshToken(token: string): JWTPayload;
