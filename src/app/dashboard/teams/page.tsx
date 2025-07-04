import { AddTeamForm } from "@/components/dashboardComponents/AddTeamForm";
import { TeamList } from "@/components/dashboardComponents/TeamList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function TeamsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session !== "active") {
    redirect("/login");
  }

  const teams = await prisma.team.findMany({
    include: { members: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to TeamPulse Dashboard</h1>
      <AddTeamForm />
      <TeamList teams={teams} />
    </div>
  );
}
