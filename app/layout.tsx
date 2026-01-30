import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScrolling from "./providers/SmoothScrolling";

const clashDisplay = localFont({
    src: [
        {
            path: "../public/fonts/clash-display/ClashDisplay-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/clash-display/ClashDisplay-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/clash-display/ClashDisplay-Semibold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/clash-display/ClashDisplay-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-clash-display",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Animotion",
    description: "Anime Streaming",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${clashDisplay.variable} font-clash antialiased overflow-x-hidden`}
            >
                <div className="noise-overlay"></div>
                <SmoothScrolling>
                    <Navbar />
                    <main>{children}</main>
                </SmoothScrolling>
            </body>
        </html>
    );
}
