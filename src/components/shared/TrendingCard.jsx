import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingCard = ({ trendingData }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

      {/* IMAGE BOX (full border style look) */}
      <div className="p-3">
        <div className="relative w-full h-52 rounded-2xl overflow-hidden border-2 border-gray-100">
          <Image
            src={trendingData.image}
            alt={trendingData.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 pb-5 space-y-3">

        {/* TAG */}
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100">
          ✨ {trendingData.description}
        </span>

        {/* TITLE */}
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {trendingData.name}
        </h2>

        {/* DESCRIPTION (better UX readability) */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {trendingData.shortDescription}
        </p>

        {/* BUDGET */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm font-semibold text-gray-700">
            💰 {trendingData.estimatedBudget}
          </p>
        </div>

        {/* BUTTON (modern gradient + glow effect) */}
        <Link href={`ideas/${trendingData._id}`}>
          <button className="w-full mt-2 relative overflow-hidden rounded-xl py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 shadow-md hover:shadow-xl transition-all duration-300 active:scale-95 group">

            {/* shine effect */}
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>

            <span className="relative">
              View Details →
            </span>

          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingCard;