"use client";

import { useTransition } from "react";
import { updateSettings } from "@/app/actions/settings-actions";

type Props = {
  initial: {
    checkInsEnabled: boolean;
    checkInFrequency: string;
  };
};

export default function SettingsForm({ initial }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(() => {
          updateSettings(formData);
        });
      }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <label htmlFor="checkInsEnabled" className="text-sm font-medium">
          Enable Check-ins
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="checkInsEnabled"
            id="checkInsEnabled"
            defaultChecked={initial.checkInsEnabled}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-all peer-checked:translate-x-full"></div>
        </label>
      </div>

      <div>
        <label
          htmlFor="checkInFrequency"
          className="block mb-1 text-sm font-medium"
        >
          Check-in Frequency
        </label>
        <select
          name="checkInFrequency"
          id="checkInFrequency"
          defaultValue={initial.checkInFrequency}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {pending ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
