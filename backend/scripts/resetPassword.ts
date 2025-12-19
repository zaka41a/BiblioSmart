import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@bibliosmart.com';
  const newPassword = 'Admin123!';

  console.log(`\n🔄 Resetting password for: ${email}\n`);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.log('❌ User not found!');
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword }
  });

  console.log('✅ Password reset successfully!\n');
  console.log('📧 Email: ' + email);
  console.log('🔑 New Password: ' + newPassword);
  console.log('\n💡 You can now log in with these credentials.\n');

  // Also reset user@bibliosmart.com
  const userEmail = 'user@bibliosmart.com';
  const userPassword = 'User123!';

  const regularUser = await prisma.user.findUnique({ where: { email: userEmail } });

  if (regularUser) {
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);
    await prisma.user.update({
      where: { email: userEmail },
      data: { password: hashedUserPassword }
    });

    console.log('✅ Also reset regular user password:\n');
    console.log('📧 Email: ' + userEmail);
    console.log('🔑 New Password: ' + userPassword + '\n');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
