import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  // Create 5 Users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        email: 'alice@example.com',
        name: 'Alice Johnson',
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        name: 'Bob Smith',
      },
    }),
    prisma.user.upsert({
      where: { email: 'charlie@example.com' },
      update: {},
      create: {
        email: 'charlie@example.com',
        name: 'Charlie Brown',
      },
    }),
    prisma.user.upsert({
      where: { email: 'david@example.com' },
      update: {},
      create: {
        email: 'david@example.com',
        name: 'David Wilson',
      },
    }),
    prisma.user.upsert({
      where: { email: 'eve@example.com' },
      update: {},
      create: {
        email: 'eve@example.com',
        name: 'Eve Adams',
      },
    }),
  ]);

  console.log(`Created ${users.length} users`);

  // Create 15 Tasks
  const taskTitles = [
    'Design landing page',
    'Implement authentication',
    'Setup CI/CD pipeline',
    'Write unit tests',
    'Documentation for API',
    'Refactor task service',
    'Add error handling',
    'Optimize database queries',
    'Fix bug in user profile',
    'Create mockups for dashboard',
    'Implement dark mode',
    'Update dependencies',
    'Setup monitoring',
    'Write integration tests',
    'Review pull request',
  ];

  const statuses = ['OPEN', 'IN_PROGRESS', 'DONE'];

  for (let i = 0; i < 15; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    await prisma.task.create({
      data: {
        title: taskTitles[i],
        description: `Description for ${taskTitles[i]}`,
        status: randomStatus,
        assignedToId: i % 3 === 0 ? null : randomUser.id, // Some unassigned tasks
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
