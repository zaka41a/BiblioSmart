import { Request } from 'express';

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
  };
}

// JWT Payload types
export interface JWTAccessPayload {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface JWTRefreshPayload {
  id: string;
  tokenId: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
