"use client"
//Формуляр за регистрация на нови потребители.
import SignUpForm from '../components/auth/SignUpForm'
//Функция за иницииране на процеса на влизане в системата - за потребители с вече създаден профил в системата. 
import { signIn } from 'next-auth/react'

//Страница за регистрация: Позволява на потребителите да създадат нов профил.
const Signup = () => {
  return (
    <div className='w-full h-full'>
      <div className="absolute bottom-0 right-20 w-[700px] h-[700px] z-0 bg-cover bg-no-repeat background-size: contain transform rotate-[35deg] opacity-20"
      style={{ backgroundImage: "url('/anchor.png')" }}/>
      {/* Формуляр за регистрация на нови потребители. */}
      <SignUpForm>
          {/* Връзка към страницата за вход, предназначена за потребители с вече съществуващи профили. */}
          <p>
              Имате профил?
              {/* Бутон, при чието натискане се изпълнява функцията signIn(), която пренасочва потребителя към страницата за вход. */}
              <button className='pl-1 text-blue-800 font-bold' >Вход</button>
          </p>
      </SignUpForm>
    </div>
  )
}

export default Signup