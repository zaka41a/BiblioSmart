import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking existing users...\n');

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });

  console.log(`Found ${users.length} users:\n`);
  users.forEach(user => {
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Name: ${user.name}`);
    console.log(`🔑 Role: ${user.role}`);
    console.log(`📅 Created: ${user.createdAt}`);
    console.log('---');
  });

  // Create test users if none exist
  if (users.length === 0) {
    console.log('\n⚠️  No users found. Creating test users...\n');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@bibliosmart.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created:');
    console.log('   Email: admin@bibliosmart.com');
    console.log('   Password: password123');
    console.log('   Role: ADMIN\n');

    // Create regular user
    const user = await prisma.user.create({
      data: {
        email: 'user@bibliosmart.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'USER'
      }
    });

    console.log('✅ Regular user created:');
    console.log('   Email: user@bibliosmart.com');
    console.log('   Password: password123');
    console.log('   Role: USER\n');
  } else {
    console.log('\n💡 You can log in with one of the existing users above.');
    console.log('💡 If you forgot the password, you can reset it using the forgot password feature.\n');
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
