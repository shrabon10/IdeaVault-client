"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CategoriesCard = ({ category }) => {
  const router = useRouter();

  const isIconValid = category?.icon && category.icon.startsWith("http");
  const finalIconSrc = isIconValid ? category.icon : defaultIcon;

  return (
    <div>
      <div className="group relative p-6 w-full rounded-2xl bg-base-200 border border-zinc-200 dark:border-zinc-900 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 overflow-hidden">
        {/* স্লিক ব্যাকগ্রাউন্ড গ্লো অন হোভার */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.01] to-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* আইকন কন্টেইনার */}
        <div className="relative w-16 h-16 rounded-xl bg-zinc-50 border border-zinc-100 dark:border-zinc-800/60 p-3 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110">
          <div className="relative w-full h-full">
            <Image
              src={finalIconSrc}
              alt={category?.name || "Category"}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* ক্যাটাগরি নেম */}
        <div className="z-10 min-w-0">
          <h3 className="text-lg font-bold  tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
            {category?.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;