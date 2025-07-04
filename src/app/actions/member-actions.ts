"use server";

import { prisma } from "@/lib/prisma";
import { Sentiment } from "@/generated/prisma"; // ✅ Import the enum

export async function addMember(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const sentiment = formData.get("sentiment")?.toString() as Sentiment; // ✅ Cast here
  const teamId = formData.get("teamId")?.toString();

  if (!name || !email || !sentiment || !teamId) return;

  await prisma.member.create({
    data: {
      name,
      email,
      sentiment,
      teamId,
    },
  });
}

export async function removeMember(memberId: string) {
  await prisma.member.delete({ where: { id: memberId } });
}

export async function updateSentiment(memberId: string, sentiment: string) {
  await prisma.member.update({
    where: { id: memberId },
    data: {
      sentiment: sentiment as Sentiment, // ✅ Cast here too
    },
  });
}
