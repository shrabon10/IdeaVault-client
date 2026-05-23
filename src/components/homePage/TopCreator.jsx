import Image from "next/image";
import React from "react";

const TopCreator = () => {
  const topCreators = [
    {
      id: 1,
      name: "Alex Johnson",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      totalIdeas: 24,
    },
    {
      id: 2,
      name: "Sophia Lee",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      totalIdeas: 18,
    },
    {
      id: 3,
      name: "Michael Brown",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      totalIdeas: 31,
    },
  ];
  return (
    <div className="space-y-10 px-2">
      <div>
        <h2 className="text-3xl font-bold">Top Creator</h2>
        <p>
          Meet talented creators sharing innovative ideas and inspiring projects
          from around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topCreators.map((topCreator) => (
          <div
            key={topCreator?.id}
            className="py-9 flex items-center justify-center rounded-lg shadow hover:-translate-y-2 duration-700 flex-col gap-5 px-2 bg-base-300"
          >
            <Image
              src={topCreator?.image}
              alt={topCreator?.name}
              width={120}
              height={120}
              className="rounded-full w-32 h-32 object-cover"
            />
            <h2 className="text-2xl font-bold">{topCreator?.name}</h2>
            <p>Total Ideas: {topCreator?.totalIdeas}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCreator;
