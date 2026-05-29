"use client";

import { MessageSquare, Pencil, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function EditCommentModal({ comment }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textLength, setTextLength] = useState(comment?.text?.length || 0);
  const [focusedField, setFocusedField] = useState(null);

  const { data } = useSession();
  const user = data?.user;

  const isCommentOwner = user?.id === comment?.userId;

  const handleEditNow = async (e) => {
    e.preventDefault();

    if (!isCommentOwner) {
      toast.error("You can only edit your own comments!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const editedData = Object.fromEntries(formData);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(editedData),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.success) {
        toast.success("Comment updated successfully!");
        document.getElementById(`modal_${comment?._id}`).close();
      } else {
        toast.error("No changes detected");
      }
    } catch (error) {
      toast.error("Failed to update comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Edit Button */}
      {isCommentOwner ? (
        <button
          onClick={() =>
            document.getElementById(`modal_${comment?._id}`).showModal()
          }
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-indigo-600 hover:to-purple-600"
        >
          <div className="flex items-center justify-center gap-2">
            <Pencil size={18} />
            <span>Edit Comment</span>
          </div>
        </button>
      ) : (
        <div className="w-full cursor-not-allowed rounded-xl bg-gray-300 px-4 py-2.5 text-sm sm:text-base font-semibold text-gray-600 opacity-60">
          <div className="flex items-center justify-center gap-2">
            <Pencil size={18} />
            <span>Edit Comment</span>
          </div>
        </div>
      )}

      {/* Modal */}
      <dialog id={`modal_${comment?._id}`} className="modal px-2 sm:px-4">
        <div className="modal-box w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl rounded-3xl bg-gradient-to-br from-white to-slate-50 p-0 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 sm:px-6 md:px-10 py-5 sm:py-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  ✏️ Edit Comment
                </h3>

                <p className="mt-1 text-sm sm:text-base text-indigo-100">
                  Update your comment information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  document.getElementById(`modal_${comment?._id}`).close()
                }
                className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30 flex-shrink-0"
              >
                <X size={22} className="sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleEditNow}
            className="space-y-5 sm:space-y-6 px-4 sm:px-6 md:px-8 py-5 sm:py-8"
          >
            {/* Comment Field */}
            <div>
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <label className="text-base sm:text-lg font-semibold text-slate-800">
                  💬 Comment
                </label>

                <span className="text-xs sm:text-sm text-slate-500">
                  {textLength} character{textLength !== 1 ? "s" : ""}
                </span>
              </div>

              <div
                className={`flex rounded-2xl border-2 bg-white px-3 sm:px-5 py-3 transition-all duration-300 ${
                  focusedField === "text"
                    ? "border-indigo-500 shadow-lg shadow-indigo-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <MessageSquare
                  className={`mt-2 flex-shrink-0 transition-colors duration-300 ${
                    focusedField === "text"
                      ? "text-indigo-500"
                      : "text-slate-400"
                  }`}
                  size={22}
                />

                <textarea
                  rows="5"
                  name="text"
                  defaultValue={comment?.text || ""}
                  placeholder="Write your comment..."
                  onFocus={() => setFocusedField("text")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setTextLength(e.target.value.length)}
                  className="w-full resize-none bg-transparent px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-5 border-t border-slate-200">
              <button
                type="button"
                onClick={() =>
                  document.getElementById(`modal_${comment?._id}`).close()
                }
                className="w-full sm:w-auto rounded-xl border-2 border-slate-300 px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[160px] rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 sm:px-10 py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-indigo-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Save Changes
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
