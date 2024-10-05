"use client"
import React from 'react';
import Link from 'next/link';
import SignInForm from '../components/auth/SignInForm';

const SignInPage = () => {
  return (
    <div className='w-full h-screen relative overflow-hidden'> {/* Set h-screen to fill the viewport and hide overflow */}
      <div 
        className="absolute bottom-0 right-20 w-[700px] h-[700px] z-0 bg-cover bg-no-repeat transform rotate-[35deg] opacity-20"
        style={{ backgroundImage: "url('/anchor.png')" }}
      />
      {/* SignIn Form */}
      <SignInForm>
        {/* Registration Link for users without an account */}
        <p>
          Нямате профил?
          <Link href='/signup' className='pl-1 text-blue-800 font-bold'>Регистрация</Link>
        </p>
      </SignInForm>
    </div>
  )
};

export default SignInPage;
