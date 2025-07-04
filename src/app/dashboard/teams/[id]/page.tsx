import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TeamSection } from "@/components/dashboardComponents/TeamSection";

export default async function TeamPage({ params }: { params: { id: string } }) {
  const team = await prisma.team.findUnique({
    where: { id: params.id },
    include: {
      members: {
        orderBy: { name: "asc" },
      },
    },
  });

  if (!team) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{team.name}</h1>
      <TeamSection team={team} />
    </div>
  );
}
