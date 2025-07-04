"use client";

import { useState, useTransition } from "react";
import { createTeam } from "@/app/actions/createTeam";
import { useRouter } from "next/navigation";

export function AddTeamForm() {
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    startTransition(() => {
      createTeam(formData).then(() => {
        setName("");
        router.refresh(); // 🔥 Soft refresh to re-run server components
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        className="border text-[12px] md:text-[14px] px-3 py-2 rounded-md w-[86%] "
        type="text"
        placeholder="New team name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button
        className="bg-black text-white hidden md:block px-4 py-2 rounded-md"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add Team"}
      </button>
      <button
        className="bg-black text-white  md:hidden px-4 py-2 rounded-md"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Adding..." : "+"}
      </button>
    </form>
  );
}
