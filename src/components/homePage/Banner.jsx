"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react"; 

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides ? 1 : prev + 1));
  };

 
  useEffect(() => {
    
    const slideInterval = setInterval(() => {
      handleNext();
    }, 4000);

    
    return () => clearInterval(slideInterval);
  }, [currentSlide]); 

  const slides = [
    {
      id: 1,
      img: "/assets/first.avif",
      title: "Share Your Ideas",
      gradientText: "With the World",
      desc: "Turn your thoughts into real-world solutions. Post your startup ideas and let others discover, improve, and collaborate with you.",
    },
    {
      id: 2,
      img: "/assets/second.avif",
      title: "Discover Innovative",
      gradientText: "Startup Ideas",
      desc: "Explore creative ideas from developers, entrepreneurs, and students around the world. Get inspired and build your next big project.",
    },
    {
      id: 3,
      img: "/assets/third.avif",
      title: "Connect, Collaborate",
      gradientText: "& Build Together",
      desc: "Find like-minded people, join discussions, and work together to turn ideas into real products that make an impact.",
    },
  ];

  return (
    <div className="w-full transition-colors duration-300">
      <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative h-[480px] md:h-[550px] lg:h-[600px] bg-black">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out flex justify-center items-center flex-col text-white px-6 md:px-12 lg:px-16 ${
              currentSlide === slide.id
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              priority={slide.id === 1}
              className="object-cover object-center w-full h-full"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/65 backdrop-blur-[0.5px]" />

            <div className="relative z-10 text-center space-y-4 max-w-xs md:max-w-2xl lg:max-w-4xl mx-auto pb-12 lg:pb-0">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tight leading-tight">
                {slide.title} <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
                  {slide.gradientText}
                </span>
              </h1>
              <p className="text-xs md:text-base font-medium text-white/80 leading-relaxed max-w-md md:max-w-xl lg:max-w-2xl mx-auto line-clamp-3 lg:line-clamp-none">
                {slide.desc}
              </p>
              <div className="pt-2 sm:pt-4">
                <Link href="/ideas">
                  <button className="px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer">
                    Explore Ideas
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* রেসপন্সিভ অ্যারো বাটন কন্ট্রোলার */}
        <div
          className="absolute z-20 flex gap-4
          bottom-5 left-1/2 -translate-x-1/2 justify-center w-auto
          lg:bottom-auto lg:left-auto lg:translate-x-0 lg:top-1/2 lg:-translate-y-1/2 lg:justify-between lg:w-[calc(100%-40px)] lg:mx-5"
        >
          <button
            onClick={handlePrev}
            className="btn btn-circle btn-md bg-black/40 hover:bg-black/70 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-90"
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="btn btn-circle btn-md bg-black/40 hover:bg-black/70 border border-white/10 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-90"
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;