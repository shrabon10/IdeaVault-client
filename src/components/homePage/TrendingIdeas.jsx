import Link from "next/link";
import React from "react";
import TrendingCard from "../shared/TrendingCard";

const TrendingIdeas = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/trendingIdeas`,
  );
  const trendingIdeaData = await res.json();
  console.log(trendingIdeaData);
  return (
    <div className=" space-y-10 px-2">
      <div className="flex items-center flex-col md:flex-row space-y-2 justify-between px-2">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">Trending Ideas</h2>
          <p className="text-gray-600">
            See what the community is building, sharing, and talking about right
            now.
          </p>
        </div>
        <Link href={"/ideas"} className="btn md:w-auto w-full">
          Browse All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trendingIdeaData.map((trendingData) => (
          <TrendingCard
            trendingData={trendingData}
            key={trendingData._id}
          ></TrendingCard>
        ))}
      </div>
    </div>
  );
};

export default TrendingIdeas;
