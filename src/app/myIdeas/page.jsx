import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import IdeaCard from "@/components/Ideas/IdeaCard";
import MyIdeaCard from "@/components/Ideas/MyIdeaCard";
import Link from "next/link";

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
      <div>
        {myIdeas.length === 0 ? (
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/20 px-6 py-12 text-center">
            {/* আইকন বা ইমোজি কন্টেইনার */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900/50 border border-zinc-800 text-3xl animate-pulse">
              💡
            </div>

            {/* মেইন মেসেজ */}
            <h3 className="mt-6 text-xl font-bold tracking-tight ">
              No Ideas Found
            </h3>

            {/* সাব-টেক্সট */}
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
              It looks like there are no ideas available at the moment. Try
              creating a new one or check back later!
            </p>

            {/* অ্যাকশন বাটন (ঐচ্ছিক, প্রয়োজন না হলে বাদ দিতে পারো) */}
            <Link
              href={"/addIdea"}
              className="mt-6 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition duration-200 hover:bg-zinc-700 active:scale-95"
            >
              Add New Idea
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myIdeas.map((idea) => (
              <MyIdeaCard idea={idea} key={idea._id}></MyIdeaCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIdeasPage;