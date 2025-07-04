"use server";

import { prisma } from "@/lib/prisma"; // Correct import now

export async function createTeam(formData: FormData) {
  const name = formData.get("name")?.toString();

  if (!name) return;

  await prisma.team.create({
    data: { name },
  });
}
