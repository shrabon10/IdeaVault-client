'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

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
            img: '/assets/sec.avif',
            title: 'Launch Your Vision',
            gradientText: 'Into Reality',
            desc: 'Transform bold concepts into impactful ventures. Share your innovative ideas, inspire others, and start building the future today.',
        },
        {
            id: 2,
            img: '/assets/fir.avif',
            title: 'Explore Limitless',
            gradientText: 'Creative Possibilities',
            desc: 'Dive into a world of groundbreaking startup concepts crafted by dreamers, developers, and innovators from across the globe.',
        },
        {
            id: 3,
            img: '/assets/third.avif',
            title: 'Collaborate With',
            gradientText: 'Future Innovators',
            desc: 'Connect with ambitious creators, exchange powerful ideas, and work together to build products that truly change lives.',
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
                                ? 'opacity-100 z-10'
                                : 'opacity-0 z-0 pointer-events-none'
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
                                    <button className="px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 shadow-md hover:shadow-fuchsia-500/20 transition-all duration-300 active:scale-[0.98] cursor-pointer">
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
