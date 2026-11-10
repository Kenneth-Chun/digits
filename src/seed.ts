import { prisma } from './lib/prisma';
import { Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

async function main() {
  console.log('Seeding the database');
  for (const account of config.defaultAccounts) {
    const role = account.role === 'ADMIN' ? Role.ADMIN : Role.USER;
    const password = await hash(account.password, 10);
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }
  for (const [index, contact] of config.defaultContacts.entries()) {
    console.log(`  Adding contact: ${JSON.stringify(contact)}`);
    await prisma.contact.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });
  }
}
main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
