"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Filter = ({ categories }) => {
  const router = useRouter();
  const handleFiltering = (value) => {
    router.push(`/ideas?search=${value}`);
  };
  return (
    <div>
      <select
        defaultValue="Filter by category"
        onChange={(e) => handleFiltering(e.target.value)}
        className="select w-full h-[50px] rounded-l-none"
      >
        <option disabled selected>
          Filter by category
        </option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
