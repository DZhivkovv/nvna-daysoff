import React from 'react';
import Link from 'next/link';
//Формуляр за вход в системата.
import SignInForm from '../components/auth/SignInForm';

//Страница за вход: Позволява на потребителите да влязат в профила си.
const SignInPage = () => {
  return (
    <div className='w-full h-full'>
        <div className="absolute bottom-0 right-20 w-[700px] h-[700px] z-0 bg-cover bg-no-repeat background-size: contain transform rotate-[35deg] opacity-20"style={{ backgroundImage: "url('/anchor.png')" }}/>
        {/* Формуляр за вход в системата. */} 
        <SignInForm>
          {/* Връзка към страницата за регистрация, предназначена за потребители, които нямат профил в системата. */}
          <p>
            Нямате профил?
            <Link href='/signup' className='pl-1 text-blue-800 font-bold'>Регистрация</Link>
          </p>
        </SignInForm>
    </div>
  )
};

export default SignInPage;
