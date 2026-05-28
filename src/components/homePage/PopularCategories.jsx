import Image from "next/image";
import React from "react";

const PopularCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/popularCategories`,
    {
      cache: "no-store",
    }
  );

  const categories = await res.json();

  return (
    <div className="space-y-10 py-10 px-2">
      {/* Heading */}
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold">Popular Categories</h2>
        <p className="text-gray-500">
          Find inspiration by exploring trending categories created by the
          community.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="card bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-full h-52">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 text-center">
              <h2 className="text-2xl font-bold">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;