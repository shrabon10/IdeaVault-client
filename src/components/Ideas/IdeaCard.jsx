import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, Wallet } from "lucide-react";

const IdeaCard = ({ idea }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-700">
      
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Image
          src={idea.image}
          alt={idea.name}
          width={500}
          height={500}
          className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-blue-600 backdrop-blur-md shadow-md">
            {idea.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <Wallet size={18} className="text-blue-600" />
          <span className="font-semibold text-gray-800 text-sm">
            {idea.estimatedBudget}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-500">
          {idea.name}
        </h2>

        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {idea.shortDescription}
        </p>

        {/* Button */}
        <Link href={`/ideas/${idea._id}`}>
          <button className="w-full mt-3 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-500 cursor-pointer">
            View Details
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-500"
            />
          </button>
        </Link>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-40 w-40 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-40 w-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default IdeaCard;