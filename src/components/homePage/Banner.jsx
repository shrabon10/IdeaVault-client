"use client";

import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="carousel w-full">
        
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <div
            style={{
              backgroundImage: "url('/assets/first.avif')",
            }}
            className="px-2 space-y-5 bg-cover bg-center w-full h-[600px] rounded text-white flex justify-center items-center flex-col"
          >
            <h1 className="text-2xl lg:text-5xl font-bold text-center">
              Share Your Ideas With the World
            </h1>

            <p className="max-w-[400px] lg:max-w-2xl text-center">
              Turn your thoughts into real-world solutions. Post your startup
              ideas and let others discover, improve, and collaborate with you.
            </p>

            <Link href="/ideas">
              <button className="btn">Explore Ideas</button>
            </Link>
          </div>

          <div className="absolute left-5 right-5 top-[100px] lg:top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>

            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <div
            style={{
              backgroundImage: "url('/assets/second.avif')",
            }}
            className="px-2 space-y-5 bg-cover bg-center w-full h-[600px] rounded text-white flex justify-center items-center flex-col"
          >
            <h1 className="text-2xl lg:text-5xl font-bold text-center">
              Discover Innovative Startup Ideas
            </h1>

            <p className="max-w-[400px] lg:max-w-2xl text-center">
              Explore creative ideas from developers, entrepreneurs, and
              students around the world. Get inspired and build your next big
              project.
            </p>

            <Link href="/ideas">
              <button className="btn">Explore Ideas</button>
            </Link>
          </div>

          <div className="absolute left-5 right-5 top-[100px] lg:top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>

            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <div
            style={{
              backgroundImage: "url('/assets/third.avif')",
            }}
            className="px-2 space-y-5 bg-cover bg-center w-full h-[600px] rounded text-white flex justify-center items-center flex-col"
          >
            <h1 className="text-2xl lg:text-5xl font-bold text-center">
              Connect, Collaborate & Build Together
            </h1>

            <p className="max-w-[400px] lg:max-w-2xl text-center">
              Find like-minded people, join discussions, and work together to
              turn ideas into real products that make an impact.
            </p>

            <Link href="/ideas">
              <button className="btn">Explore Ideas</button>
            </Link>
          </div>

          <div className="absolute left-5 right-5 top-[100px] lg:top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>

            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;