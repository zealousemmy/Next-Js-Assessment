"use client";

import { useState, useTransition } from "react";
import { addMember } from "@/app/actions/member-actions";
import { useRouter } from "next/navigation";

export function AddMemberForm({ teamId }: { teamId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sentiment, setSentiment] = useState("HAPPY");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("sentiment", sentiment);
    formData.append("teamId", teamId);

    startTransition(() => {
      addMember(formData).then(() => {
        setName("");
        setEmail("");
        router.refresh();
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          className="border rounded-md px-3 py-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border rounded-md px-3 py-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className="border rounded-md px-3 py-2"
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
        >
          <option value="HAPPY">Happy</option>
          <option value="NEUTRAL">Neutral</option>
          <option value="SAD">Sad</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white py-2 rounded-md"
      >
        {isPending ? "Adding..." : "Add Member"}
      </button>
    </form>
  );
}
