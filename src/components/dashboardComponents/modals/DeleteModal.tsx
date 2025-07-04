"use client";

import { deleteTeam } from "@/app/actions/teams";
import { useState } from "react";
// import { deleteTeam, updateTeam } from "@/actions/teams";

function DeleteTeamModal({
  teamId,
  onComplete,
}: {
  teamId: string;
  onComplete?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("teamId", teamId);
    await deleteTeam(formData);
    setOpen(false);
    onComplete?.();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 text-sm hover:underline"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 bg-[#000000a0] bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this team? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteTeamModal;
