"use client"
import React from 'react';
import Calendar from '../components/Calendar';
import Link from 'next/link';

const Page = () => {
  return (
    <div className='h-screen relative'>
      <Calendar />
      <div className="absolute bottom-20 right-10 m-4 bg-blue-800 hover:bg-blue-500 transition-all rounded-md px-5 py-5 text-white z-10 font-bold">
        <Link href='/leave-request'>Запазете отпуск</Link>
      </div>
    </div>
  );
};

export default Page;
