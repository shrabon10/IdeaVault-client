"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const TrendingCard = ({ trendingData }) => {
  const defaultPlaceholder =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";

  const router = useRouter();

  const isImageValid =
    trendingData?.image && trendingData.image.startsWith("http");
  const finalImage = isImageValid ? trendingData.image : defaultPlaceholder;

  return (
    <div className="group rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none hover:-translate-y-2 duration-300 flex flex-col justify-between">
      {/* 🎯 Next.js <Image> উইথ fill এবং ট্রেন্ডিং ব্যাজ */}
      <div className="relative w-full h-56 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={finalImage}
          alt={trendingData?.name || "Trending Idea Image"}
          fill
          className="object-cover group-hover:scale-105 duration-500"
          unoptimized
        />
        <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wider animate-pulse">
          Trending 🔥
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-xl">
              {trendingData?.category}
            </span>
          </div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 line-clamp-1">
            {trendingData?.name}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-medium">
            {trendingData?.shortDescription}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Est. Budget
            </span>
            <span className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200">
              {trendingData?.estimatedBudget
                ? `$${trendingData.estimatedBudget}`
                : "Flexible"}
            </span>
          </div>
          <Link
            href={`ideas/${trendingData?._id}`}
            className="block cursor-pointer w-full"
          >
            <button className="w-full py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-500/10">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;