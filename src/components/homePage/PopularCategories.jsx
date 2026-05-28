import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoriesCard from "../shared/CategoriesCard";

const PopularCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/popularCategories`,
  );
  const categories = await res.json();

  // 🎯 আইকন মিসিং বা ইনভ্যালিড থাকলে ব্যাকআপ প্লেসহোল্ডার আইকন
  const defaultIcon =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";

  return (
    <div className="space-y-10 py-10 px-4  mx-auto">
      {/* হেডার সেকশন */}
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tight ">
          Popular Categories
        </h2>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl">
          Find inspiration by exploring trending categories created by the
          community.
        </p>
      </div>

      {/* ক্যাটাগরি গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {


          return (
            <CategoriesCard
              category={category}
              key={category._id}
            ></CategoriesCard>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;