import Image from "next/image";
import Link from "next/link";
import React from "react";

const PopularCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/popularCategories`,
  );
  const categories = await res.json();
  console.log(categories);
  return (
    <div className="space-y-10 py-10 px-2">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold">Popular Categories</h2>
        <p className="text-gray-500">
          Find inspiration by exploring trending categories created by the
          community.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
        {categories.map((category) => (
          <div
            className="py-10 px-5 w-full hover:scale-101 hover:text-white hover:bg-blue-500 transition-all duration-1000 flex items-center justify-center gap-5 card shadow"
            key={category._id}
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={100}
              height={100}
            ></Image>
            <h2 className="text-2xl font-bold">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
