import Filter from "@/components/Ideas/Filter";
import IdeaCard from "@/components/Ideas/IdeaCard";
import Input from "@/components/Ideas/Input";
import { auth } from "@/lib/auth";
import { TriangleAlert } from "lucide-react";
import { headers } from "next/headers";
import React from "react";

export const metadata = {
  title: "IdeaVault | Ideas",
  description: "All Ideas here",
};

const IdeasPage = async ({ searchParams }) => {
  const { user } =
    (await auth.api.getSession({
      headers: await headers(),
    })) || "";

  const { search } = await searchParams;
  console.log(search);

  const res = await fetch(
    `${search ? `${NEXT_PUBLIC_SERVER_URL}/searchedIdeas?search=${search}` : `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`}`,
  );
  const ideas = await res.json();

  const categoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`,
  );
  const categories = await categoryRes.json();
  console.log(ideas);

  return (
    <div className="space-y-7 px-2">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">Ideas</h2>
        <p className="text-gray-500">
          This is a platform where you can explore and share creative ideas for
          productivity, learning, and innovation.
        </p>{" "}
      </div>
      <div className="grid grid-cols-12 gap-2 md:gap-0">
        <div className="col-span-12 md:col-span-9">
          <Input></Input>
        </div>
        <div className="col-span-12 md:col-span-3">
          <Filter categories={categories}></Filter>
        </div>
      </div>

      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ideas.map((idea) => (
            <IdeaCard idea={idea} key={idea._id}></IdeaCard>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center shadow-sm shadow-slate-200/50">
          <TriangleAlert
            className="mx-auto"
            color="red"
            size={100}
          ></TriangleAlert>
          <p className="text-3xl font-semibold text-slate-700">
            No ideas found
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Try another keyword or add a new idea to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default IdeasPage;
