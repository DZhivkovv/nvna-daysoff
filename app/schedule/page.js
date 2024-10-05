"use client"
import React from 'react';
import Calendar from '../components/Calendar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  if(!session)
  {
    router.push('/signin');
  }

  return (
    <div className='h-screen relative'>
        <p className="text-lg font-medium text-gray-700 text-center">
          Календар с одобрени отпуски.
        </p>
        <Calendar />
    </div>
  );
};

export default Page;
