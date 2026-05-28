import InteractionCard from "@/components/Ideas/InteractionCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export const metadata = {
  title: "IdeaVault | MyInteractions",
  description: "Here my all interaction which I did",
};

const MyInteractionsPage = async () => {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`);
  const allComments = await res.json();
  const comments = allComments.filter((comment) => comment.userId === user.id);

  return (
    <div className="px-2">
      <h2 className="text-3xl font-bold mb-5">My Interactions</h2>

      <div>
        {comments.length === 0 ? (
          <div className="flex min-h-[350px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/10 px-6 py-10 text-center">
            {/* আইকন কন্টেইনার */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-2xl text-zinc-400">
              ⚡
            </div>

            {/* মেইন হেডিং */}
            <h3 className="mt-5 text-lg font-semibold tracking-tight ">
              No Interactions Yet
            </h3>

            {/* সাব-টেক্সট */}
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-zinc-500">
              There is no activity or interaction recorded for this item. Be the
              first to start the engagement!
            </p>
          </div>
        ) : (
          <div className="space-y-4 ">
            {comments.map((comment) => (
              <InteractionCard
                key={comment._id}
                comment={comment}
              ></InteractionCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInteractionsPage;