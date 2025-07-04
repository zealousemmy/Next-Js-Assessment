// prisma/seed.ts

import { PrismaClient, Sentiment } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (for dev convenience)
  await prisma.member.deleteMany();
  await prisma.team.deleteMany();

  // Create Teams
  const teams = await prisma.team.createMany({
    data: [
      { name: "Team Alpha" },
      { name: "Team Beta" },
      { name: "Team Gamma" },
    ],
  });

  // Fetch teams to get IDs
  const allTeams = await prisma.team.findMany();

  // Add members to each team with mixed sentiments
  for (const team of allTeams) {
    await prisma.member.createMany({
      data: [
        {
          name: "Alice Johnson",
          email: `${team.name
            .toLowerCase()
            .replace(" ", "")}+alice@teampulse.dev`,
          sentiment: Sentiment.HAPPY,
          teamId: team.id,
        },
        {
          name: "Bob Smith",
          email: `${team.name
            .toLowerCase()
            .replace(" ", "")}+bob@teampulse.dev`,
          sentiment: Sentiment.NEUTRAL,
          teamId: team.id,
        },
        {
          name: "Carol Lee",
          email: `${team.name
            .toLowerCase()
            .replace(" ", "")}+carol@teampulse.dev`,
          sentiment: Sentiment.SAD,
          teamId: team.id,
        },
      ],
    });
  }

  console.log("✅ Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
