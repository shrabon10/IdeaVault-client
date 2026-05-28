"use client";

import Image from "next/image";
import React from "react";
import { Lightbulb, Trophy, Users, Sparkles } from "lucide-react";

const TopCreator = () => {
  const topCreators = [
    {
      id: 1,
      name: "Alex Johnson",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      totalIdeas: 24,
      role: "AI Startup Founder",
    },
    {
      id: 2,
      name: "Sophia Lee",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      totalIdeas: 18,
      role: "Creative Product Designer",
    },
    {
      id: 3,
      name: "Michael Brown",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      totalIdeas: 31,
      role: "Tech Entrepreneur",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold">
            Meet Our Top Creators
          </h2>

          <p className="max-w-2xl mx-auto text-base-content/70 text-lg">
            Discover passionate innovators, entrepreneurs, and creators who are
            sharing groundbreaking startup ideas with the community.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topCreators.map((creator, index) => (
            <div
              key={creator.id}
              className="group relative overflow-hidden rounded-3xl bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              {/* Top Badge */}
              <div className="absolute top-5 right-5 z-10">
                <div className="badge badge-primary badge-lg font-bold">
                  #{index + 1}
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative z-10 p-8 flex flex-col items-center text-center space-y-5">
                
                {/* Image */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-20 scale-110"></div>

                  <Image
                    src={creator.image}
                    alt={creator.name}
                    width={140}
                    height={140}
                    className="rounded-full w-36 h-36 object-cover border-4 border-base-100 shadow-lg"
                  />
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-2xl font-bold">{creator.name}</h3>
                  <p className="text-primary font-medium">
                    {creator.role}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 pt-2">
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Lightbulb className="w-6 h-6 text-primary" />
                    </div>

                    <h4 className="font-bold text-xl mt-2">
                      {creator.totalIdeas}
                    </h4>

                    <p className="text-sm text-base-content/60">
                      Ideas
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>

                    <h4 className="font-bold text-xl mt-2">
                      12K+
                    </h4>

                    <p className="text-sm text-base-content/60">
                      Followers
                    </p>
                  </div>
                </div>

                {/* Button */}
                <button className="btn btn-primary rounded-full px-8 mt-4">
                  View Profile
                </button>
              </div>

              {/* Bottom Trophy */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-base-100 rounded-2xl shadow-lg p-8 text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-base-content/70">
              Innovative Ideas Shared
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl shadow-lg p-8 text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-secondary/10 p-4 rounded-full">
                <Users className="w-8 h-8 text-secondary" />
              </div>
            </div>

            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-base-content/70">
              Active Community Members
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl shadow-lg p-8 text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-accent/10 p-4 rounded-full">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
            </div>

            <h3 className="text-3xl font-bold">120+</h3>
            <p className="text-base-content/70">
              Startup Projects Launched
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCreator;