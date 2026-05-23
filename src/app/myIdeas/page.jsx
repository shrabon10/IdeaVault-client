import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import IdeaCard from "@/components/Ideas/IdeaCard";
import MyIdeaCard from "@/components/Ideas/MyIdeaCard";

export const metadata = {
  title: "IdeaVault | MyIdeas",
  description: "Here my all ideas which shared",
};

const MyIdeasPage = async () => {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`);
  const ideas = await res.json();
  const myIdeas = ideas.filter((idea) => idea.userId === user?.id);
  return (
    <div className="mt-10 px-2">
      <h2 className="text-3xl font-bold mb-5">My Ideas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {myIdeas.map((idea) => (
          <MyIdeaCard idea={idea} key={idea._id}></MyIdeaCard>
        ))}
      </div>
    </div>
  );
};

export default MyIdeasPage;
