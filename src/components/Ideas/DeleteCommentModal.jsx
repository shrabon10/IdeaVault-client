"use client";

import { Trash2, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

const DeleteCommentModal = ({ comment }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { data } = useSession();
  const user = data?.user;

  const router = useRouter();

  const isCommentOwner = user?.id === comment?.userId;

  const handleDelete = async () => {
    if (!isCommentOwner) {
      toast.error("You can only delete your own comment.");
      return;
    }

    setIsDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Delete request failed");
      }

      toast.success("Comment deleted successfully.");

      document.getElementById(`delete_comment_modal_${comment?._id}`).close();

      router.refresh();
    } catch (error) {
      toast.error("Failed to delete comment.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Delete Button */}
      {isCommentOwner ? (
        <button
          onClick={() =>
            document
              .getElementById(`delete_comment_modal_${comment?._id}`)
              .showModal()
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm sm:text-base font-semibold text-white shadow-md transition hover:bg-red-600"
        >
          <Trash2 size={16} />
          Delete
        </button>
      ) : (
        <button
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-2 text-sm sm:text-base font-semibold text-slate-500 shadow-sm"
          title="You can only delete your own comments"
        >
          <Trash2 size={16} />
          Delete
        </button>
      )}

      {/* Modal */}
      <dialog
        id={`delete_comment_modal_${comment?._id}`}
        className="modal px-2 sm:px-4"
      >
        <div className="modal-box w-full max-w-[95%] sm:max-w-md rounded-[28px] bg-white p-4 sm:p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
                Delete Comment
              </p>

              <h2 className="mt-2 sm:mt-3 text-lg sm:text-2xl font-bold leading-snug text-slate-900">
                Are you sure you want to delete this comment?
              </h2>
            </div>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(`delete_comment_modal_${comment?._id}`)
                  .close()
              }
              className="flex-shrink-0 rounded-full bg-slate-100 p-2 sm:p-3 text-slate-600 transition hover:bg-slate-200"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-6 text-slate-600">
            This action cannot be undone. The comment will be removed
            permanently from the idea thread.
          </p>

          {/* Buttons */}
          <div className="mt-6 sm:mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(`delete_comment_modal_${comment?._id}`)
                  .close()
              }
              className="w-full sm:w-auto rounded-2xl border border-slate-300 px-5 py-3 text-sm sm:text-base font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:from-red-600 hover:to-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Comment"}
            </button>
          </div>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DeleteCommentModal;
