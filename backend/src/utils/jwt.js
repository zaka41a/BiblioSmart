const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-this';

/**
 * Sign an access token with custom expiration
 * @param {Object} payload - Token payload containing user information
 * @param {string} expiresIn - Token expiration time (default: 45 minutes)
 * @returns {string} Signed JWT access token
 */
const signAccessToken = (payload, expiresIn = '45m') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Sign a refresh token with 14 days expiration
 * @param {Object} payload - Token payload containing user information
 * @returns {string} Signed JWT refresh token
 */
const signRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '14d' });
};

/**
 * Verify and decode an access token
 * @param {string} token - JWT access token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} if token is invalid or expired
 */
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

/**
 * Verify and decode a refresh token
 * @param {string} token - JWT refresh token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} if token is invalid or expired
 */
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
