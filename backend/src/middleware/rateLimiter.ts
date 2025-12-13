import rateLimit from 'express-rate-limit';

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP address. Please try again in 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests for authenticated users (optional)
  skipSuccessfulRequests: false
});

/**
 * Strict rate limiter for authentication endpoints
 * 5 requests per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    error: 'Too many login attempts. Please try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true // Don't count successful logins
});

/**
 * Rate limiter for resource creation
 * 20 requests per hour per IP
 */
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 creates per hour
  message: {
    error: 'Too many resource creations. Please try again in one hour.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter for file uploads
 * 10 uploads per hour per IP
 */
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    error: 'Too many uploads. Please try again in one hour.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Very strict limiter for password reset
 * 3 requests per hour per IP
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    error: 'Too many password reset requests. Please try again in one hour.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Organization-specific rate limiter
 * Limits based on plan (to be implemented with custom logic)
 */
export const organizationLimiter = (maxRequests: number) => {
  return rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: maxRequests,
    message: {
      error: 'Daily request limit reached for your plan. Please upgrade.',
      upgrade: true
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Custom key generator based on organizationId
    keyGenerator: (req) => {
      const orgId = (req as any).organizationId;
      return orgId || req.ip || 'unknown';
    }
  });
};

// Plan-based limits
export const PLAN_RATE_LIMITS = {
  TRIAL: 1000,      // 1000 requests per day
  BASIC: 5000,      // 5000 requests per day
  PRO: 50000,       // 50000 requests per day
  ENTERPRISE: -1    // Unlimited (-1)
};
