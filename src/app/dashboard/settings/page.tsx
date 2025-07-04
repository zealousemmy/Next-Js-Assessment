import SettingsForm from "@/components/dashboardComponents/SettingsForm";
import { prisma } from "@/lib/prisma";
// import SettingsForm from '@/components/SettingsForm';

export default async function SettingsPage() {
  const settings = await prisma.appSettings.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
      <SettingsForm
        initial={{
          checkInsEnabled: settings?.checkInsEnabled ?? false,
          checkInFrequency: settings?.checkInFrequency ?? "daily",
        }}
      />
    </div>
  );
}
