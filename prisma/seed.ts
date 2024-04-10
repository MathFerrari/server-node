import {prisma} from '../src/lib/prisma';

async function seed() {
    await prisma.event.create({
        data: {
            id: 'e5159cf6-2f02-463f-8239-ff0777723805',
            title: 'My first event',
            slug: 'my-first-event',
            details: 'This is my first event, welcome!',
            maximumAttendees: 128,
        }
    });
}

seed().then(() => {
    console.log('Seed completed successfully!');
    prisma.$disconnect();
}).catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
})