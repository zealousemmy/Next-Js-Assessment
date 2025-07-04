"use client";

import { useState, useTransition } from "react";
import { AddMemberForm } from "./AddMemberForm";
import { updateSentiment, removeMember } from "@/app/actions/member-actions";
import { useRouter } from "next/navigation";

type Member = {
  id: string;
  name: string;
  email: string;
  sentiment: "HAPPY" | "NEUTRAL" | "SAD";
};

type Team = {
  id: string;
  name: string;
  members: Member[];
};

const ITEMS_PER_PAGE = 10;

export function TeamSection({ team }: { team: Team }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const filtered = team.members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleSentimentChange = (memberId: string, value: string) => {
    startTransition(() => {
      updateSentiment(memberId, value).then(() => router.refresh());
    });
  };

  const handleRemove = (memberId: string) => {
    startTransition(() => {
      removeMember(memberId).then(() => router.refresh());
    });
  };

  return (
    <div className="border rounded-md p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{team.name}</h2>

      <AddMemberForm teamId={team.id} />

      <input
        placeholder="Search members..."
        className="mb-3 px-3 py-2 border rounded-md w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to first page on search
        }}
      />

      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-3 py-2">Name</th>
            <th className="text-left px-3 py-2">Email</th>
            <th className="text-left px-3 py-2">Sentiment</th>
            <th className="text-left px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="px-3 py-2">{m.name}</td>
              <td className="px-3 py-2">{m.email}</td>
              <td className="px-3 py-2">
                <select
                  value={m.sentiment}
                  onChange={(e) => handleSentimentChange(m.id, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="HAPPY">Happy</option>
                  <option value="NEUTRAL">Neutral</option>
                  <option value="SAD">Sad</option>
                </select>
              </td>
              <td className="px-3 py-2">
                <button
                  onClick={() => handleRemove(m.id)}
                  className="text-red-600 text-xs"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
