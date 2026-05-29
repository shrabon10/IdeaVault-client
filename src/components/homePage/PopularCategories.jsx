import React from "react";
import CategoriesCard from "../shared/CategoriesCard";
import { Sparkles, TrendingUp, BrainCircuit } from "lucide-react";

const PopularCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/popularCategories`,
    {
      cache: "no-store",
    }
  );

  const categories = await res.json();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Modern AI Header */}
        <div className="text-center space-y-6 mb-16">
          
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/20 bg-white/10 backdrop-blur-xl shadow-lg">
            <BrainCircuit className="text-blue-500" size={18} />
            <span className="text-sm font-semibold text-blue-600">
              AI Powered Discovery
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            Explore{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Trending
            </span>{" "}
            Categories
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
            Discover innovative startup ideas, trending industries, and
            AI-curated categories designed to inspire your next big project.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-5 pt-4">
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white shadow-md border border-zinc-100">
              <TrendingUp className="text-green-500" size={20} />
              <div>
                <h4 className="font-bold text-lg">50+</h4>
                <p className="text-sm text-zinc-500">Trending Topics</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white shadow-md border border-zinc-100">
              <Sparkles className="text-yellow-500" size={20} />
              <div>
                <h4 className="font-bold text-lg">AI Curated</h4>
                <p className="text-sm text-zinc-500">Smart Suggestions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category._id}
              className="hover:scale-[1.03] transition-all duration-500"
            >
              <CategoriesCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;