"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const NavigationLinks = ({ userEmail, isOpen }) => {
  const links = [
    [0, 'График', '/schedule'],
    [1, 'Запазете отпуск', '/leave-request'],
  ];

  if (userEmail) {
    links.push([2, `${userEmail}`, '/account']);
    links.push([3, 'Изход', '/sign-out']);
  } else {
    links.push([2, 'Вход', '/signin']);
    links.push([3, 'Регистрация', '/signup']);
  }

  return (
    <ul
      className={`md:flex md:items-center md:space-x-4 space-y-2 md:space-y-0 absolute md:relative bg-white md:bg-transparent top-full left-0 w-full md:w-auto transition-all duration-300 ease-in-out z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      {links.map(([id, title, url]) => (
        <li key={id} className='list-none'>
          <Link href={url} className='text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-base md:text-sm'>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession(); // Use the useSession hook to get the session

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-md z-50 relative">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        <Link href="/" className='text-xl font-bold'>
        <img
            src='/nvna-logo.png'
            alt='Nikola Vaptsarov Naval Academy'
            className='w-20 h-15' 

          />        
        </Link>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className="h-8 w-8 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        {/* Pass session data to NavigationLinks */}
        <NavigationLinks userEmail={session?.user?.email} isOpen={isOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
