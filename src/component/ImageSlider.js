"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ImageSlider = ({ media = [] }) => {
    const [current, setCurrent] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    // safety check
    if (!Array.isArray(media) || media.length === 0) {
        return (
            <div className="w-full h-[350px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center border border-gray-700/50">
                <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>No media available</p>
                </div>
            </div>
        );
    }

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % media.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + media.length) % media.length);
    };

    const openLightbox = (index) => {
        setCurrent(index);
        setLightboxOpen(true);
    };

    return (
        <>
            {/* Main Slider */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 group">
                {/* Slider Container */}
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {media.map((url, index) => (
                        <div
                            key={index}
                            className="min-w-full flex justify-center items-center cursor-pointer"
                            onClick={() => openLightbox(index)}
                        >
                            {typeof url === 'string' && url.endsWith(".mp4") ? (
                                <video
                                    src={url}
                                    controls
                                    className="w-full h-[350px] object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            ) : (
                                <div className="relative w-full h-[350px]">
                                    <Image
                                        src={typeof url === 'string' ? url : url.url || url}
                                        alt={`slide-${index}`}
                                        fill
                                        className="object-contain"
                                        priority={index === 0}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons - Only show if more than 1 image */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevSlide();
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextSlide();
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                            {media.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrent(index);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === current
                                            ? "w-6 bg-purple-500"
                                            : "bg-white/50 hover:bg-white/80"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Image Counter */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    {current + 1} / {media.length}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-5 right-5 text-white hover:text-gray-300 z-10 bg-black/50 p-2 rounded-full"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div
                        className="relative w-full max-w-6xl h-full max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            {typeof media[current] === 'string' && media[current].endsWith(".mp4") ? (
                                <video
                                    src={media[current]}
                                    controls
                                    className="max-w-full max-h-full"
                                    autoPlay
                                />
                            ) : (
                                <Image
                                    src={typeof media[current] === 'string' ? media[current] : media[current].url || media[current]}
                                    alt={`lightbox-${current}`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            )}
                        </div>

                        {media.length > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageSlider;