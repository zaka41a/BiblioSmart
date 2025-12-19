import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('\n📋 Liste de TOUS les utilisateurs dans la base de données:\n');

  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  allUsers.forEach((user, index) => {
    console.log(`${index + 1}. 👤 ${user.name}`);
    console.log(`   📧 Email: ${user.email}`);
    console.log(`   🔑 Role: ${user.role}`);
    console.log(`   🆔 ID: ${user.id}`);
    console.log(`   📅 Created: ${user.createdAt}`);
    console.log('');
  });

  console.log(`\n📊 Total: ${allUsers.length} utilisateur(s)\n`);

  // Find admin users
  const adminUsers = allUsers.filter(u => u.role === 'ADMIN');

  if (adminUsers.length > 0) {
    console.log('🔄 Réinitialisation du mot de passe pour tous les comptes ADMIN...\n');

    const newPassword = 'Admin123!';
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    for (const admin of adminUsers) {
      await prisma.user.update({
        where: { id: admin.id },
        data: { password: hashedPassword }
      });

      console.log(`✅ Mot de passe réinitialisé pour: ${admin.email}`);
      console.log(`   🔑 Nouveau mot de passe: ${newPassword}\n`);
    }
  }

  // Also reset password for zakaria if exists
  const zakaria = allUsers.find(u => u.email.includes('zaksab'));
  if (zakaria) {
    const userPassword = 'User123!';
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);

    await prisma.user.update({
      where: { id: zakaria.id },
      data: { password: hashedUserPassword }
    });

    console.log(`✅ Mot de passe réinitialisé pour: ${zakaria.email}`);
    console.log(`   🔑 Nouveau mot de passe: ${userPassword}\n`);
  }

  console.log('\n🎯 Vous pouvez maintenant vous connecter avec ces identifiants!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
