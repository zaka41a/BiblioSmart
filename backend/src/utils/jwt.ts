import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "dev-access-secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret";

export const signAccessToken = (payload: object, expiresIn = "30m") =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn });

export const signRefreshToken = (payload: object, expiresIn = "14d") =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn });

export const verifyAccessToken = (token: string) => jwt.verify(token, ACCESS_SECRET);
export const verifyRefreshToken = (token: string) => jwt.verify(token, REFRESH_SECRET);
