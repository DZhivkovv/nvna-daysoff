"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useLoading from '@/app/hooks/useLoader';
import LoadingSpinner from '../LoadingSpinner';
import { signIn } from 'next-auth/react';
import FormError from './FormError';

const SignInForm = ({ children }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [authError, setAuthError] = useState(null); // State to handle authentication errors
  const router = useRouter();
  const [isLoading, setLoading] = useLoading();

  
  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError(null);

    const loginData = {
      email: data.email,
      password: data.password,
      redirect: false, // Prevent redirect
    };

    // Sign in with NextAuth
    const result = await signIn('credentials', loginData);
    setLoading(false);

    if (result?.error) {
      // Handle error
      setAuthError('Невалиден email адрес или парола.');
    } else if (result?.ok) {
      router.push('/');
    }
  };

  return (
    <div className="flex items-center justify-center h-[92%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm: w-[95%] md: max-w-md px-10 pt-8 pb-10 bg-white shadow-md rounded-md z-20  items-center"
      >
        <div>
          <h2 className="mb-6 text-3xl text-center font-bold">Вход</h2>
          <p className='mb-2 text-center'>Добре дошли в системата за запазване на отпуски на ВВМУ Н.Й.Вапцаров</p>
        </div>

        <div className="mb-4 p-2">
          <label
            htmlFor="email"
            className="mb-2 block text-gray-700 text-sm font-bold"
          >
            Email адрес
          </label>
          <input
            type="text"
            id="email"
            placeholder="Email адрес"
            {...register('email', {
              required: 'Въведете Email адрес',
            })}
            name="email"
            className={`border ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            } transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
          />
          {errors.email && <FormError error={errors.email.message} />}
        </div>

        <div className="mb-6 p-2">
          <label
            htmlFor="password"
            className="mb-2 block text-gray-700 text-sm font-bold"
          >
            Парола
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register('password', {
              required: 'Въведете парола',
            })}
            className={`border ${
              errors.password ? 'border-red-500' : 'border-gray-200'
            } transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
            placeholder="Парола"
          />
          {errors.password && <FormError error={errors.password.message} />}
        </div>


        <div className='mb-4 text-center flex justify-center'>
          {authError && <p className="absolute text-red-500">{authError}</p>} {/* Display the authentication error */}
        </div>

        <button
          type="submit"
          className="w-full py-2 text-sm mt-4 text-white bg-indigo-900 hover:bg-indigo-700 transition-all rounded-md"
        >Вход</button>

        <div className="mt-4 text-xs">{children}</div>
      </form>

      {isLoading && <LoadingSpinner />}

    </div>
  );
};

export default SignInForm;
