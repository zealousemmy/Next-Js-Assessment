"use client";

import { useSearch } from "@/context/SearchContext";
import Link from "next/link";
import { Sentiment } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import EditTeamModal from "./modals/EditModal";
import DeleteTeamModal from "./modals/DeleteModal";

// Define a local type for members
type Member = {
  id: string;
  name: string;
  email: string;
  sentiment: Sentiment;
};

type TeamWithMembers = {
  id: string;
  name: string;
  createdAt: Date;
  members: Member[];
};

export function TeamList({ teams }: { teams: TeamWithMembers[] }) {
  const { search } = useSearch();
  const router = useRouter();

  const getAverageSentiment = (members: Member[]) => {
    if (!members.length) return "N/A";

    const scores: Record<Sentiment, number> = {
      HAPPY: 2,
      NEUTRAL: 1,
      SAD: 0,
    };

    const avg =
      members.reduce((sum, m) => sum + scores[m.sentiment], 0) / members.length;

    if (avg >= 1.5) return "😊 Happy";
    if (avg >= 0.5) return "😐 Neutral";
    return "😞 Sad";
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const refreshAfterAction = () => {
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {filteredTeams.length > 0 ? (
        filteredTeams.map((team) => (
          <div
            key={team.id}
            className="border p-4 rounded-md my-4 shadow-sm hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center">
              <Link href={`/dashboard/teams/${team.id}`}>
                <h2 className="text-lg font-semibold hover:underline">
                  {team.name}
                </h2>
              </Link>
              <div className="flex gap-2">
                <EditTeamModal
                  teamId={team.id}
                  currentName={team.name}
                  onComplete={refreshAfterAction}
                />
                <DeleteTeamModal
                  teamId={team.id}
                  onComplete={refreshAfterAction}
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Members: {team.members.length} — Avg Sentiment:{" "}
              {getAverageSentiment(team.members)}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm mt-4">
          No teams match your search.
        </p>
      )}
    </div>
  );
}
