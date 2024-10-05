"use client"
import React from 'react'
import Link from 'next/link'
//Функция за иницииране на процеса на излизане от системата. 
import { signOut } from 'next-auth/react'

//Страница за изход: Позволява на потребителите да излязат от профила си.
const LogoutPage = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        {/* Подканващ текст. */}
        <h2 className='text-xl text-center mb-6'>Моля потвърдете, че искате да излезете от профила си:</h2>
        
        {/* Бутони за изход и отказ */}
        <div className='flex justify-center space-x-4'>
          {/* Бутон за изход */}
          {/* При натискането на този бутон, се извиква функцията signOut - потребителят излиза от профила си и бива пренасочен към страницата за вход (/signIn). */}
          <button className='bg-indigo-900 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-md' onClick={() => signOut({ callbackUrl: '/signin' })}>Изход</button>
          
          {/* Бутон за отказ */}
          <Link href='/'>
            <button className='bg-gray-200 hover:bg-gray-300 font-bold px-6 py-3 rounded-md'>Отказ</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage