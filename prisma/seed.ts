import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const illodev = await prisma.user.upsert({
        where: { email: "test@test.es" },
        update: {},
        create: {
            email: "test@test.es",
            name: "illodev",
            ProjectMember: {
                create: {
                    project: {
                        create: {
                            key: "TEST",
                            name: "Test Project",
                            Task: {
                                create: {
                                    number: 1,
                                    name: "Test Task",
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    console.log({ illodev });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
