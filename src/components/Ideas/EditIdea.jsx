"use client";

import { Pencil, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function EditIdeaModal({ idea }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { data } = useSession();
  const user = data?.user;

  const handleEditNow = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const info = Object.fromEntries(formData);

    const ideaData = {
      name: info?.name,
      category: info?.category,
      shortDescription: info?.shortDescription,
      detailedDescription: info?.detailedDescription,
      tags: info?.tags ? info.tags.split(",").map((tag) => tag.trim()) : [],
      image: info?.image,
      estimatedBudget: info?.estimatedBudget,
      targetAudience: info?.targetAudience,
      problemStatement: info?.problemStatement,
      proposedSolution: info?.proposedSolution,
      userImage: user?.image,
      userName: user?.name,
      userId: user?.id,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(ideaData),
        },
      );

      const responseData = await res.json();

      if (responseData.modifiedCount > 0) {
        toast.success("Idea updated successfully!");
        window.location.reload();
      } else {
        toast.error("No changes detected");
      }
    } catch (error) {
      toast.error("Failed to update idea");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Edit Trigger Button */}
      <button
        onClick={() =>
          document.getElementById(`modal_${idea?._id}`).showModal()
        }
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-indigo-600 hover:to-purple-600"
      >
        <div className="flex items-center justify-center gap-2">
          <Pencil size={18} />
          <span>Edit Idea</span>
        </div>
      </button>

      {/* HTML5 Dialog Modal */}
      <dialog id={`modal_${idea?._id}`} className="modal px-2 sm:px-4">
        <div className="modal-box w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl rounded-3xl bg-gradient-to-br from-white to-slate-50 p-0 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 sm:px-6 md:px-10 py-5 sm:py-7 sticky top-0 z-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  💡 Edit Idea
                </h3>
                <p className="mt-1 text-sm sm:text-base text-indigo-100">
                  Update your idea details and information
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  document.getElementById(`modal_${idea?._id}`).close()
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
            className="space-y-6 px-4 sm:px-6 md:px-8 py-5 sm:py-8"
          >
            {/* Grid for Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Idea Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={idea?.name || ""}
                  className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  defaultValue={idea?.category || ""}
                  className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Short Description
              </label>
              <input
                type="text"
                name="shortDescription"
                defaultValue={idea?.shortDescription || ""}
                className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <div className="mb-2 flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span>📝</span> Detailed Description
                </label>
              </div>
              <div
                className={`flex rounded-2xl border-2 bg-white px-4 py-3 transition-all duration-300 ${
                  focusedField === "detailedDescription"
                    ? "border-indigo-500 shadow-xl shadow-indigo-100"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <textarea
                  rows="4"
                  name="detailedDescription"
                  defaultValue={idea?.detailedDescription || ""}
                  placeholder="Describe your brilliant idea in detail..."
                  onFocus={() => setFocusedField("detailedDescription")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full resize-none bg-transparent text-sm sm:text-base text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Grid for Tags & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  defaultValue={idea?.tags ? idea.tags.join(", ") : ""}
                  placeholder="tech, startup, ai"
                  className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Estimated Budget
                </label>
                <input
                  type="text"
                  name="estimatedBudget"
                  defaultValue={idea?.estimatedBudget || ""}
                  className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={idea?.image || ""}
                className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                defaultValue={idea?.targetAudience || ""}
                className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Problem Statement */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Problem Statement
              </label>
              <textarea
                name="problemStatement"
                defaultValue={idea?.problemStatement || ""}
                rows="2"
                className="w-full rounded-xl border-2 border-slate-200 p-3 outline-none focus:border-indigo-500 transition resize-none"
              />
            </div>

            {/* Proposed Solution */}
            <div>
              <div className="mb-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span>🚀</span> Proposed Solution
                </label>
              </div>
              <div
                className={`flex rounded-2xl border-2 bg-white px-4 py-3 transition-all duration-300 ${
                  focusedField === "proposedSolution"
                    ? "border-purple-500 shadow-xl shadow-purple-100"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <textarea
                  rows="3"
                  name="proposedSolution"
                  defaultValue={idea?.proposedSolution || ""}
                  placeholder="How are you going to solve this problem?"
                  onFocus={() => setFocusedField("proposedSolution")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full resize-none bg-transparent text-sm sm:text-base text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Form Footer Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-5 border-t border-slate-200 sticky bottom-0 bg-white py-2">
              <button
                type="button"
                onClick={() =>
                  document.getElementById(`modal_${idea?._id}`).close()
                }
                className="w-full sm:w-auto rounded-xl border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[160px] rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-indigo-600 hover:to-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      <span>Save Changes</span>
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
