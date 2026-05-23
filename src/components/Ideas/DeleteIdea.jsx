"use client";

import { Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteIdeaModal({ idea }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteNow = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}`,
        {
          method: "DELETE",
        },
      );

      const responseData = await res.json();

      if (responseData.deletedCount > 0 || responseData.success) {
        toast.success("Idea deleted successfully!");
        document.getElementById(`delete_modal_${idea?._id}`).close();

        window.location.reload();
      } else {
        toast.error("Failed to delete. Idea might not exist.");
      }
    } catch (error) {
      toast.error("Something went wrong. Failed to delete idea.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Delete Trigger Button */}
      <button
        onClick={() =>
          document.getElementById(`delete_modal_${idea?._id}`).showModal()
        }
        className="w-full rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-red-600 hover:to-rose-700"
      >
        <div className="flex items-center justify-center gap-2">
          <Trash2 size={18} />
          <span>Delete Idea</span>
        </div>
      </button>

      {/* HTML5 Dialog Modal */}
      <dialog id={`delete_modal_${idea?._id}`} className="modal px-2 sm:px-4">
        <div className="modal-box w-full max-w-[95%] sm:max-w-md rounded-3xl bg-white p-0 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-6 text-center relative">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <Trash2 size={32} className="text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Are you sure?
            </h3>
            <button
              type="button"
              onClick={() =>
                document.getElementById(`delete_modal_${idea?._id}`).close()
              }
              className="absolute top-4 right-4 rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 text-center space-y-4">
            <p className="text-slate-600 text-sm sm:text-base">
              Do you really want to delete{" "}
              <strong className="text-slate-800">"{idea?.name}"</strong>? This
              action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  document.getElementById(`delete_modal_${idea?._id}`).close()
                }
                className="w-full sm:w-auto rounded-xl border-2 border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                No, Keep it
              </button>

              <button
                type="button"
                onClick={handleDeleteNow}
                disabled={isDeleting}
                className="w-full sm:w-auto min-w-[120px] rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
