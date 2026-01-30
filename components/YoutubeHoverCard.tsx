"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface YouTubeHoverCardProps {
    videoId: string; // ID Video Youtube (contoh: "M7lc1UVf-VE")
    imageSrc: string; // URL Poster/Thumbnail
    title: string;
    forceHover?: boolean;
}

export default function YouTubeHoverCard({
    videoId,
    imageSrc,
    title,
    forceHover,
}: YouTubeHoverCardProps) {
    const [internalHover, setInternalHover] = useState(false);
    const isHovered = forceHover !== undefined ? forceHover : internalHover;

    // URL dengan parameter wajib untuk autoplay background
    // autoplay=1: Jalan otomatis
    // mute=1: Wajib agar bisa autoplay di Chrome/Safari
    // controls=0: Sembunyikan player
    // modestbranding=1: Kurangi logo YT
    // rel=0: Jangan tampilkan video rekomendasi channel lain
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}&showinfo=0&rel=0&iv_load_policy=3&fs=0`;

    return (
        <div
            className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900 shadow-2xl group cursor-pointer"
            onMouseEnter={() => setInternalHover(true)}
            onMouseLeave={() => setInternalHover(false)}
        >
            {/* 1. LAYER GAMBAR (Poster) */}
            <div className="absolute inset-0 z-10">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className={`object-cover transition-opacity duration-700 ${
                        isHovered ? "opacity-0" : "opacity-100"
                    }`}
                />
            </div>

            {/* 2. LAYER VIDEO (YouTube Iframe) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-0 bg-black"
                    >
                        <iframe
                            src={youtubeUrl}
                            className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        {/* CATATAN CSS IFRAME:
                w-[150%] & h-[150%] digunakan untuk "zoom in" sedikit 
                agar garis hitam di sisi video YouTube tidak terlihat.
             */}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. LOADING INDICATOR (Opsional, visual feedback saat buffering) */}
            {isHovered && (
                <div className="absolute inset-0 z-[-1] flex items-center justify-center bg-gray-800">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}
        </div>
    );
}
