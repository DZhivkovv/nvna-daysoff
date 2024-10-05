"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="h-screen flex relative">
      <div className="hidden lg:flex w-1/2 h-full bg-no-repeat bg-center md:bg-fixed items-center justify-center relative left-side">
        <Image 
          src="/nvna.jpg" 
          alt="Background Image" 
          layout="fill" // Ensures the image fills its container
          objectFit="cover" // Ensures the image covers the area
          className="absolute inset-0 z-0" // Ensure it's behind other elements
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black opacity-50 z-10" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-8 h-full"> {/* Add h-full to the flex container */}
        <h1 className="text-4xl text-center md:text-5xl font-bold text-gray-800 mb-4">ВВМУ Н. Й. Вапцаров</h1>
        <p className="text-gray-700 text-center mb-8">
          Добре дошли в системата за запазване на отпуски на ВВМУ Н. Й. Вапцаров!
        </p>
        <Link href="/leave-request" className='bg-blue-800 hover:bg-indigo-700 text-white font-bold px-6 md:px-10 py-3 md:py-4 text-lg rounded-md transition-all'>
          Запазете отпуск
        </Link>
      </div>
    </div>
  );
};

export default Home;