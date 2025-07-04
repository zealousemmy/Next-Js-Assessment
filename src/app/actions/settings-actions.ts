"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const checkInsEnabled = formData.get("checkInsEnabled") === "on";
  const checkInFrequency =
    formData.get("checkInFrequency")?.toString() ?? "daily";

  await prisma.appSettings.upsert({
    where: { id: "singleton" },
    update: { checkInsEnabled, checkInFrequency },
    create: {
      id: "singleton",
      checkInsEnabled,
      checkInFrequency,
    },
  });

  revalidatePath("/settings");
}
