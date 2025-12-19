import { prisma } from '../prisma';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { Role } from '@prisma/client';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  /**
   * Register a new user with secure password hashing
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Un compte existe déjà avec cet email');
    }

    // Hash password with bcrypt
    const hashedPassword = await hashPassword(data.password);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || Role.USER
      }
    });

    // Generate JWT tokens
    const accessToken = signAccessToken({ sub: user.id, role: user.role }, '45m');
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    };
  }

  /**
   * Login user with email and password
   */
  async login(data: LoginData): Promise<AuthResponse> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Verify password using bcrypt
    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Generate fresh JWT tokens
    const accessToken = signAccessToken({ sub: user.id, role: user.role }, '45m');
    const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = verifyRefreshToken(refreshToken);

      // Verify user still exists
      const user = await prisma.user.findUnique({
        where: { id: payload.sub }
      });

      if (!user) {
        throw new Error('Utilisateur introuvable');
      }

      // Generate new access token
      const accessToken = signAccessToken({ sub: user.id, role: user.role }, '45m');

      return { accessToken };
    } catch (error) {
      throw new Error('Refresh token invalide ou expiré');
    }
  }

  /**
   * Get user profile by ID
   */
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    return user;
  }

  /**
   * Update user profile
   */
  async updateUser(userId: string, data: { name?: string; email?: string }) {
    // Check if email is already taken by another user
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id: userId }
        }
      });

      if (existingUser) {
        throw new Error('Cet email est déjà utilisé');
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    // Verify old password
    const isPasswordValid = await comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new Error('Mot de passe actuel incorrect');
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    return { success: true };
  }
}

export const authService = new AuthService();
