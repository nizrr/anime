"use client";
import React, { useEffect, useState } from "react";

const FallingStars = () => {
    const [stars, setStars] = useState<any[]>([]);

    useEffect(() => {
        const starCount = 20;
        const newStars = new Array(starCount).fill(0).map((_, i) => ({
            id: i,
            left: Math.floor(Math.random() * 100),
            top: Math.floor(Math.random() * 100),
            delay: Math.random() * 5000,
            duration: 3000 + Math.random() * 2000,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="shooting-star-container fixed inset-0 z-0 pointer-events-none scale-150">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        animationDelay: `${star.delay}ms`,
                        animationDuration: `${star.duration}ms`,
                        animationName: "tail, shooting",
                        animationTimingFunction: "ease-in-out, ease-in-out",
                        animationIterationCount: "infinite, infinite",
                    }}
                />
            ))}
        </div>
    );
};

export default FallingStars;
