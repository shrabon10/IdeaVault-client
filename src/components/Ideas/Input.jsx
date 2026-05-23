"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Input = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  useEffect(() => {
    router.push(`/ideas?search=${searchText}`);
  }, [searchText]);
  return (
    <div>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        className="w-full py-3 rounded-r-none placeholder:text-gray-400 px-3 border border-gray-300"
        placeholder="Search Idea..."
      />
    </div>
  );
};

export default Input;
