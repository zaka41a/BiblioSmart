import crypto from 'crypto';
import { prisma } from '../config/database';

/**
 * EmailJS Data Interface
 * Structure for email data sent via EmailJS
 */
interface EmailJSData {
  to_email: string;
  to_name: string;
  reset_link: string;
}

/**
 * Professional Email Service
 * Handles password reset and email notifications
 */
export class EmailService {
  /**
   * Create a secure password reset token
   * Token is stored in database and valid for 1 hour
   *
   * @param email - User email address
   * @returns Reset token string or null if user not found
   */
  async createPasswordResetToken(email: string): Promise<string | null> {
    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        // Don't reveal if email exists (security best practice)
        return null;
      }

      // Generate cryptographically secure random token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

      // Token expires in 1 hour
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      // Store token using RefreshToken model (temporary solution)
      // Delete any existing password reset tokens for this user
      await prisma.refreshToken.deleteMany({
        where: {
          userId: user.id,
          token: { startsWith: 'reset_' }
        }
      });

      // Create new password reset token
      await prisma.refreshToken.create({
        data: {
          token: `reset_${hashedToken}`,
          userId: user.id,
          expiresAt
        }
      });

      return resetToken;
    } catch (error) {
      console.error('Error creating password reset token:', error);
      return null;
    }
  }

  /**
   * Generate EmailJS template data for password reset email
   *
   * @param email - Recipient email address
   * @param resetToken - Password reset token
   * @param baseUrl - Frontend base URL
   * @returns EmailJS template parameters
   */
  generatePasswordResetEmailData(email: string, resetToken: string, baseUrl: string): EmailJSData {
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}`;

    return {
      to_email: email,
      to_name: email.split('@')[0], // Extract name from email
      reset_link: resetLink
    };
  }

  /**
   * Verify password reset token
   *
   * @param token - Reset token to verify
   * @returns User ID if token is valid, null otherwise
   */
  async verifyPasswordResetToken(token: string): Promise<string | null> {
    try {
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      // Find token in database
      const tokenRecord = await prisma.refreshToken.findFirst({
        where: {
          token: `reset_${hashedToken}`,
          expiresAt: { gt: new Date() }
        }
      });

      if (!tokenRecord) {
        return null;
      }

      return tokenRecord.userId;
    } catch (error) {
      console.error('Error verifying password reset token:', error);
      return null;
    }
  }

  /**
   * Clear password reset token after use
   *
   * @param userId - User ID to clear tokens for
   */
  async clearPasswordResetToken(userId: string): Promise<void> {
    try {
      await prisma.refreshToken.deleteMany({
        where: {
          userId,
          token: { startsWith: 'reset_' }
        }
      });
    } catch (error) {
      console.error('Error clearing password reset token:', error);
    }
  }

  /**
   * Send welcome email to new user
   * Note: This is a placeholder - implement EmailJS integration when needed
   *
   * @param email - User email
   * @param name - User name
   */
  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    console.log(`📧 Welcome email would be sent to ${name} <${email}>`);
    // TODO: Implement EmailJS integration
  }
}

// Export singleton instance
export const emailService = new EmailService();
