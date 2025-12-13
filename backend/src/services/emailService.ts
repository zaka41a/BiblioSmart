import crypto from 'crypto';
import { prisma } from '../prisma';

/**
 * Email Service using EmailJS
 * Handles password reset and other notifications
 */
export class EmailService {
  /**
   * Create password reset token
   * Valid for 1 hour
   */
  async createPasswordResetToken(email: string): Promise<string | null> {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if email exists for security
      return null;
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Token expires in 1 hour
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Store hashed token in database
    // You'll need to add a PasswordReset model or add fields to User model
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: hashedToken,
        passwordResetExpires: expiresAt
      }
    });

    // Return the unhashed token to send via email
    return resetToken;
  }

  /**
   * Verify password reset token
   */
  async verifyPasswordResetToken(token: string): Promise<string | null> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          gt: new Date() // Token not expired
        }
      }
    });

    if (!user) {
      return null;
    }

    return user.id;
  }

  /**
   * Clear password reset token after use
   */
  async clearPasswordResetToken(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null
      }
    });
  }

  /**
   * Generate password reset email data for EmailJS
   */
  generatePasswordResetEmailData(email: string, resetToken: string, baseUrl: string) {
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
    const subject = "Reset Your Password";
    const message =
      "You requested a password reset. Click the link below to reset your password. This link expires in 1 hour.";

    return {
      to_email: email,
      to_name: email,
      user_email: email,
      subject,
      message,
      reset_url: resetUrl,
      reset_link: resetUrl,
      from_name: "BiblioSmart",
      from_email: "noreply@bibliosmart.com",
      reply_to: "support@bibliosmart.com"
    };
  }
}

export const emailService = new EmailService();
