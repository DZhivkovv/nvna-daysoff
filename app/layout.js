"use client";
import React from 'react';
import Head from 'next/head';
import Navbar from './components/Navbar';
import AuthProvider from './components/auth/AuthProvider';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Система за запазване на отпуски - ВВМУ Н. Й. Вапцаров</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <body className={`${inter.className} h-screen bg-slate-100 overflow-hidden flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <div className="flex-grow overflow-hidden"> {/* Change overflow-y-auto to overflow-hidden */}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
