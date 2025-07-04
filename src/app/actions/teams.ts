// src/actions/teams.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTeam(formData: FormData) {
  const teamId = formData.get("teamId")?.toString();
  if (!teamId) return;

  await prisma.team.delete({
    where: { id: teamId },
  });

  revalidatePath("/dashboard");
}

export async function updateTeam(formData: FormData) {
  const teamId = formData.get("teamId")?.toString();
  const name = formData.get("name")?.toString();

  if (!teamId || !name) return;

  await prisma.team.update({
    where: { id: teamId },
    data: { name },
  });
}
