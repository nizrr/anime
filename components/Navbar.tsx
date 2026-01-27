import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav className="h-20 bg-slate-800 py-4 px-3 md:px-10 flex items-center justify-between">
            <Link href="/" className="text-white font-medium">
                Animotion
            </Link>
            <div>Search</div>
        </nav>
    );
};

export default Navbar;
