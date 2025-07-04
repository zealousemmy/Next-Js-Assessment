"use client";

import { updateTeam } from "@/app/actions/teams";
import { useState } from "react";
function EditTeamModal({
  teamId,
  currentName,
  onComplete,
}: {
  teamId: string;
  currentName: string;
  onComplete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("teamId", teamId);
    formData.append("name", name);
    await updateTeam(formData);
    setOpen(false);
    setLoading(false);
    onComplete?.();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-blue-600 text-sm hover:underline mr-2"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-[#000000a0] bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Edit Team Name</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Team Name"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTeamModal;
