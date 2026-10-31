/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

// Define strict type for the passed props
export interface GalleryPhoto {
    id: number;
    src: string;
}

interface ListingGalleryProps {
    photos: GalleryPhoto[];
    title?: string;
}

export default function ListingGallery({ photos, title }: ListingGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // If no photos or data is invalid
    if (!photos || photos.length === 0) {
        return (
            <div className="w-full max-w-[400px] aspect-4/5 rounded-2xl flex flex-col items-center justify-center text-gray-400 bg-gray-100 border border-gray-200">
                <span className="text-4xl mb-2">📖</span>
                <span>No image available</span>
            </div>
        );
    }

    const mainPhotoSrc = photos[selectedIndex].src;

    return (
        <div className="flex flex-col gap-4 w-full max-w-[400px]">
            {/* Main Image Container */}
            <div className="relative w-[400px] aspect-4/5 rounded-xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={mainPhotoSrc}
                    alt={title || "Book cover"}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails Row */}
            {photos.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
                    {photos.map((photo, index) => {
                        const isSelected = selectedIndex === index;
                        return (
                            <button
                                key={photo.id || index}
                                onClick={() => setSelectedIndex(index)}
                                className={`relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden border transition-all duration-200 ${
                                    isSelected
                                        ? "ring-2 ring-bronze border-transparent opacity-100 scale-105"
                                        : "border-gray-200 opacity-70 hover:opacity-100 hover:border-bronze/50"
                                }`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={photo.src}
                                    alt={`View ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
