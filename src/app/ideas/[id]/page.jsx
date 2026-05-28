import CommentBox from "@/components/Ideas/CommentBox";
import CommentInput from "@/components/Ideas/CommentInput";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "IdeaLust | Idea",
  description: "This is a single idea page",
};

const IdeaDetailsPage = async ({ params }) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const idea = await res.json();

  const commentRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,
  );
  const allComments = await commentRes.json();
  const comments = allComments.filter((comment) => comment.ideaId === idea._id);

  // 🎯 ব্যানার ইমেজ সেফটি গার্ড
  const defaultBanner =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";
  const isBannerValid = idea?.image && idea.image.startsWith("http");
  const finalBannerSrc = isBannerValid ? idea.image : defaultBanner;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-6 space-y-10">
      {/* 🎯 মেইন কার্ড কন্টেইনার - লাইট মোডে সলিড সাদা, ডার্কে রিচ জিঙ্ক */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-5 md:p-8 shadow-sm space-y-6">
        {/* মেইন ব্যানার ইমেজ (ফিক্সড রেশিও ও ওভারফ্লো প্রোটেকশন) */}
        <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={finalBannerSrc}
            alt={idea?.name || "Idea Banner"}
            fill
            className="object-cover hover:scale-[1.02] duration-500 transition-transform"
            unoptimized
          />
        </div>

        {/* হেডার কন্টেন্ট সেকশন */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-xl">
              {idea?.category}
            </span>

            {/* ট্যাগস লুপ */}
            {idea?.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-block text-xs font-semibold px-2.5 py-1 text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            {idea?.name}
          </h1>

          <p className="break-words whitespace-pre-wrap text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
            {idea?.detailedDescription}
          </p>

          {/* ইউজার ইনফো এরিয়া */}
          <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
            {idea?.userImage &&
            idea.userImage.startsWith("http") &&
            !idea.userImage.includes(
              "googleusercontent.com/profile/picture",
            ) ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-zinc-200 dark:ring-zinc-800">
                <Image
                  src={idea.userImage}
                  alt={idea?.userName || "User"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 text-white font-bold flex items-center justify-center uppercase select-none text-sm shrink-0">
                {idea?.userName ? idea.userName.charAt(0) : "U"}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                Shared by
              </span>
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {idea?.userName || "Anonymous User"}
              </span>
            </div>
          </div>
        </div>

        {/* টেকনিক্যাল বা মেটা ইনফরমেশন গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-900">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100/70 dark:border-zinc-900/50 flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Estimated Budget
            </span>
            <span className="text-base font-extrabold text-zinc-800 dark:text-zinc-200">
              {idea?.estimatedBudget ? `$${idea.estimatedBudget}` : "Flexible"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100/70 dark:border-zinc-900/50 flex flex-col gap-1">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Target Audience
            </span>
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 break-words whitespace-pre-wrap">
              {idea?.targetAudience || "General"}
            </span>
          </div>
        </div>

        {/* প্রবলেম ও সলিউশন সেকশন */}
        <div className="space-y-5 pt-2">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Problem Statement
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium bg-zinc-50 dark:bg-zinc-900/20 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900/30">
              {idea?.problemStatement}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Proposed Solution
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium bg-blue-50/30 dark:bg-blue-950/10 p-4 rounded-xl border border-blue-100/50 dark:border-blue-950/20">
              {idea?.proposedSolution}
            </p>
          </div>
        </div>
      </div>

      {/* 💬 কমেন্ট ইনপুট বক্স */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-3xl p-5 md:p-6 shadow-sm">
        <CommentInput idea={idea} />
      </div>

      {/* 💬 কমেন্ট লিস্ট এরিয়া */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            Discussion
          </h2>
          <span className="px-2 py-0.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-md">
            {comments.length}
          </span>
        </div>

        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentBox comment={comment} key={comment._id} />
            ))
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center text-center p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-3xl shadow-sm">
              <div className="text-4xl animate-bounce">💬</div>
              <h3 className="mt-4 text-base font-bold text-zinc-800 dark:text-zinc-200">
                No comments yet
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 font-medium max-w-xs">
                Be the first one to share your thoughts and start the
                conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;