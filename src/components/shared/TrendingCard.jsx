import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingCard = ({ trendingData }) => {
  return (
    <div className="rounded space-y-5 shadow hover:-translate-y-2 duration-700">
      <Image
        src={trendingData.image}
        alt={trendingData.name}
        width={200}
        height={200}
        className="w-full h-100"
      ></Image>

      <div className="card-body">
        <div>
          <span className="py-1 px-4 text-white font-semibold rounded-[2000px] bg-blue-600">
            {trendingData.category}
          </span>
        </div>
        <h2 className="text-2xl font-bold">{trendingData.name}</h2>
        <p>{trendingData.shortDescription}</p>

        <p>{trendingData.estimatedBudget}</p>
        <Link href={`ideas/${trendingData._id}`}>
          <button className="btn btn-primary w-full hover:scale-105 duration-700">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingCard;
