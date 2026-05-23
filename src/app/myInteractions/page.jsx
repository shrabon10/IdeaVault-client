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

      <div className="space-y-4 ">
        {comments.map((comment) => (
          <InteractionCard
            key={comment._id}
            comment={comment}
          ></InteractionCard>
        ))}
      </div>
    </div>
  );
};

export default MyInteractionsPage;
