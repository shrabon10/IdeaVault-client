"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CommentInput = ({ idea }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();

  const handleAddNow = async () => {
    if (!text.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setIsSubmitting(true);
    const commentData = {
      text: text,
      userId: user?.id,
      image: user?.image,
      name: user?.name,
      ideaId: idea?._id,
      createdAt: new Date(),
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      const data = await res.json();
      toast.success("Comment added successfully");
      setText("");
      document.getElementById("inp").value = "";
      router.refresh();
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddNow();
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Share Your Thoughts
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Let the creator know what you think about this idea.
          </p>
        </div>

        <div className="space-y-4">
          <div
            className={`relative flex items-center gap-3 px-4 py-3 bg-white rounded-xl border-2 transition-all duration-300 ${
              isFocused
                ? "border-indigo-500 shadow-lg shadow-indigo-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-gray-400 text-xl">💬</span>
            <input
              id="inp"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyPress={handleKeyPress}
              placeholder="Write a comment..."
              className="flex-1 outline-none text-gray-800 placeholder-gray-400 text-base bg-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddNow}
              disabled={!text.trim() || isSubmitting}
              className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Posting...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Post Comment
                </>
              )}
            </button>
          </div>

          {text.length > 0 && (
            <p className="text-xs text-gray-500">
              {text.length} character{text.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
