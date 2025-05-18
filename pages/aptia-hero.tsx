// For App Router: app/aptia-hero/page.tsx
// For Pages Router: pages/aptia-hero.tsx
"use client"; // Required for App Router if using client-side hooks like useState, useEffect

import React, { useState, useEffect } from 'react';
import Head from 'next/head'; // For Pages Router, or use Metadata API for App Router
import Image from 'next/image'; // For optimized images
import ChatInterface from '@/components/ChatInterface'; // Adjust path if needed
// For the chat toggle button icon

// Aptia Logo SVG Component (Example - or use an <Image /> tag if it's a file)
const AptiaLogo = () => (
    <svg width="80" height="27" viewBox="0 0 80 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0202 26.6828V0.602783H26.2102V11.0728L33.3702 0.602783H39.4202L31.4302 12.3328L39.8302 26.6828H33.6302L28.5902 17.4728L26.2102 20.1328V26.6828H21.0202ZM0.00019171 26.6828V0.602783H16.0802C18.1102 0.602783 19.7602 1.04278 21.0302 1.92278C22.3002 2.79278 23.2002 3.99278 23.7302 5.52278C24.2702 7.05278 24.5402 8.82278 24.5402 10.8328V16.1528C24.5402 18.1628 24.2702 19.9328 23.7302 21.4628C23.2002 22.9928 22.3002 24.1928 21.0302 25.0628C19.7602 25.9428 18.1102 26.3828 16.0802 26.3828H5.19019V16.8728H14.1102C15.0902 16.8728 15.8702 16.7028 16.4502 16.3628C17.0302 16.0228 17.3202 15.5228 17.3202 14.8628V12.1228C17.3202 11.4628 17.0302 10.9628 16.4502 10.6228C15.8702 10.2828 15.0902 10.1128 14.1102 10.1128H5.19019V26.6828H0.00019171ZM5.19019 5.49278H14.5202C15.5702 5.49278 16.3602 5.65278 16.8902 5.97278C17.4202 6.29278 17.6802 6.77278 17.6802 7.41278V7.71278C17.6802 8.36278 17.4202 8.84278 16.8902 9.15278C16.3602 9.46278 15.5702 9.62278 14.5202 9.62278H5.19019V5.49278ZM59.8921 26.6828V0.602783H75.9721C77.9421 0.602783 79.5421 1.04278 80.7721 1.92278C81.9621 2.76278 82.7721 3.93278 83.2021 5.43278C83.6321 6.93278 83.8421 8.67278 83.8421 10.6528V16.3328C83.8421 18.3128 83.6321 20.0528 83.2021 21.5528C82.7721 23.0528 81.9621 24.2228 80.7721 25.1028C79.5421 25.9828 77.9421 26.4228 75.9721 26.4228H65.0821V16.8728H74.0021C74.9821 16.8728 75.7621 16.7028 76.3421 16.3628C76.9221 16.0228 77.2121 15.5228 77.2121 14.8628V12.1228C77.2121 11.4628 76.9221 10.9628 76.3421 10.6228C75.7621 10.2828 74.9821 10.1128 74.0021 10.1128H65.0821V26.6828H59.8921ZM65.0821 5.49278H74.4121C75.4621 5.49278 76.2521 5.65278 76.7821 5.97278C77.3121 6.29278 77.5721 6.77278 77.5721 7.41278V7.71278C77.5721 8.36278 77.3121 8.84278 76.7821 9.15278C76.2521 9.46278 75.4621 9.62278 74.4121 9.62278H65.0821V5.49278Z" fill="white"/>
        <path d="M50.9659 0.602783L42.4959 26.6828H47.9359L49.7059 21.2528H57.5359L59.3059 26.6828H64.7459L56.2759 0.602783H50.9659ZM53.6259 6.73278L56.1259 16.4228H51.1259L53.6259 6.73278Z" fill="#00DDAA"/>
    </svg>
);

// For App Router, you might define metadata like this:
// export const metadata = {
//   title: 'Aptia - Administration Partner',
// };

export default function AptiaHeroPage() {
    const [currentYear, setCurrentYear] = useState('');
    const [isChatVisible, setIsChatVisible] = useState(false);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []);

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    // Define styles that were in the <style> tag.
    // For better organization, these could be in globals.css or a separate CSS module.
    const bodyStyle: React.CSSProperties = {
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#0A2540', // Aptia Dark Blue/Charcoal
        color: 'white',
        // overflowX: 'hidden', // Apply this on a higher level if needed, or ensure no content overflows
    };

    const heroBgShapeStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '50%',
        height: '100%',
        backgroundColor: '#00DDAA', // Aptia Green
        clipPath: 'ellipse(80% 100% at 100% 70%)',
        zIndex: 0,
    };

    const heroPersonImgStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: 0,
        right: '5%',
        width: 'auto',
        height: '70%',
        maxHeight: '450px',
        objectFit: 'contain',
        objectPosition: 'bottom right',
        zIndex: 1,
    };


    return (
        <>
            {/* For Pages Router, Head component is used for title and meta tags */}
            {/* For App Router, this is handled by layout.tsx and metadata object */}
            <Head>
                <title>Aptia - Administration Partner</title>
                <meta name="description" content="Aptia - Your specialist tech-enabled administration partner." />
                <link rel="icon" href="/favicon.ico" /> {/* Make sure you have a favicon */}
            </Head>

            {/* Apply body styles to a wrapper div if not using globals.css for this */}
            <div style={bodyStyle} className="min-h-screen flex flex-col relative overflow-hidden">
                <header className="absolute top-0 left-0 right-0 z-20 py-4">
                    <div className="container mx-auto px-6 flex justify-between items-center">
                        <div className="text-2xl font-bold">
                            <AptiaLogo />
                        </div>
                        <nav className="hidden md:flex items-center">
                            <a href="#" className="px-3 py-2 text-sm font-medium text-white hover:text-teal-300 transition-colors">About</a>
                            <a href="#" className="px-3 py-2 text-sm font-medium text-white hover:text-teal-300 transition-colors">Solutions</a>
                            <a href="#" className="px-3 py-2 text-sm font-medium text-white hover:text-teal-300 transition-colors">Careers</a>
                            <a href="#" className="px-3 py-2 text-sm font-medium text-white hover:text-teal-300 transition-colors">Contact</a>
                            <a href="#" className="px-3 py-2 text-sm font-medium text-white hover:text-teal-300 transition-colors">Insights</a>
                            <a href="#" className="px-3 py-2 text-sm font-medium text-white hover:text-teal-300 transition-colors">Press</a>
                        </nav>
                        <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-sm font-semibold border-2 rounded-md transition-colors bg-teal-500 text-slate-900 border-transparent">UK</button>
                            <button className="px-3 py-1 text-sm font-semibold border-2 rounded-md transition-colors border-white text-white hover:bg-white hover:text-slate-900">US</button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow flex items-center relative pt-20 pb-10 md:pt-32 md:pb-20">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-xl lg:max-w-2xl">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                                Administration is a <br className="hidden md:inline" />genuine passion <br className="hidden md:inline" />for us.
                            </h1>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-400 mb-6"> {/* Aptia Green Text */}
                                No one does more.
                            </h2>
                            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-md lg:max-w-lg text-slate-200">
                                We are Aptia, your specialist tech-enabled administration partner.
                                In the highly complex and underserved space of pensions and benefits, we strive to make things simple and easy. Our sole focus is administration – and we do it with genuine passion responding to your and your members’ needs. With our experienced team, backed by insight and unmatched technical expertise.
                            </p>
                            <button
                                id="openChatBtn"
                                onClick={toggleChatVisibility}
                                className="bg-teal-500 text-slate-900 font-semibold px-8 py-3 rounded-md hover:bg-teal-400 transition-colors text-lg"
                            >
                                Chat with Aptia Assistant
                            </button>
                        </div>
                    </div>

                    <div style={heroBgShapeStyle}></div>
                    {/* Use Next.js Image component for optimization */}
                    {/* Make sure to place hero-person.png in public/images/ */}
                    <Image
                        src="/images/hero-person.png" // Path relative to the 'public' folder
                        alt="Person"
                        width={400} // Provide appropriate width
                        height={450} // Provide appropriate height
                        style={heroPersonImgStyle}
                        onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
                    />
                </main>

                <footer className="py-6 text-center text-sm text-slate-400 z-10 relative">
                    <p>&copy; {currentYear} Aptia. All rights reserved.</p>
                    <p className="mt-1">
                        <a href="#" className="hover:text-teal-300">Privacy Policy</a> |
                        <a href="#" className="hover:text-teal-300">Terms of Service</a>
                    </p>
                </footer>
            </div>

            {/* Chat Widget Integration */}
            {/* The ChatInterface component is already designed to be fixed and float */}
            {/* We just control its rendering with the isChatVisible state */}
            <ChatInterface
                isVisible={isChatVisible}
                onClose={toggleChatVisibility}
            />
        </>
    );
}
