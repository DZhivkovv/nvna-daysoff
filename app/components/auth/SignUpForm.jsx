"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import FormError from './FormError';
import signUp from '@/app/utils/employees';
import useLoading from '@/app/hooks/useLoader';
import LoadingSpinner from '../LoadingSpinner';

const SignUpForm = ({ children }) => {
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const router = useRouter();
    const [apiError, setApiError] = useState(null); 
    const [isLoading, setLoading] = useLoading();
    
    const onSubmit = async (data) => {
        setApiError(null);     
        setLoading(true);

        const registration = await signUp(data);
        setLoading(false);

        if (registration.status === 201) {
            router.replace('/signin');
        } 
         else {
            setApiError(registration.message); 
        }
    }

    return (
        <div className="flex items-center justify-center h-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg px-8 py-8 mb-10 bg-white shadow-md rounded-md z-10 grid grid-cols-2 gap-x-4"
            >
                <h2 className="mb-6 text-3xl text-center font-bold col-span-2">Регистрация</h2>

                {/* Email */}
                <div className="mb-4 p-3 relative">
                    <label htmlFor="email" className="mb-2 block text-gray-700 text-sm font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Въведете Email адрес',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Невалиден Email адрес',
                            },
                        })}
                        className={`border ${errors.email ? 'border-red-500' : 'border-gray-200'} transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
                    />
                    {errors.email && <FormError error={errors.email.message} />}
                </div>

                {/* First Name */}
                <div className="mb-4 p-3 relative">
                    <label htmlFor="firstName" className="mb-2 block text-gray-700 text-sm font-bold">
                        Име
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Име"
                        {...register('firstName', {
                            required: 'Въведете име',
                        })}
                        className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
                    />
                    {errors.firstName && <FormError error={errors.firstName.message} />}
                </div>

                {/* Password */}
                <div className="mb-4 p-3 relative">
                    <label htmlFor="password" className="mb-2 block text-gray-700 text-sm font-bold">
                        Парола
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Парола"
                        {...register('password', {
                            required: 'Въведете парола',
                            minLength: {
                                value: 8,
                                message: 'Паролата трябва да бъде с дължина от поне 8 символа',
                            },
                            validate: {
                                uppercase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    'Паролата трябва да съдържа поне 1 главна буква',
                                lowercase: (value) =>
                                    /[a-z]/.test(value) ||
                                    'Паролата трябва да съдържа поне 1 малка буква',
                                number: (value) =>
                                    /[0-9]/.test(value) ||
                                    'Паролата трябва да съдържа поне 1 цифра',
                            },
                        })}
                        className={`border ${errors.password ? 'border-red-500' : 'border-gray-200'} transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
                    />
                    {errors.password && <FormError error={errors.password.message} />}
                </div>

                {/* Middle Name */}
                <div className="mb-4 p-3 relative">
                    <label htmlFor="middleName" className="mb-2 block text-gray-700 text-sm font-bold">
                        Презиме
                    </label>
                    <input
                        type="text"
                        id="middleName"
                        placeholder="Презиме"
                        {...register('middleName', {
                            required: 'Въведете презиме',
                        })}
                        className={`border ${errors.middleName ? 'border-red-500' : 'border-gray-200'} transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
                    />
                    {errors.middleName && <FormError error={errors.middleName.message} />}
                </div>
                                {/* Department */}
                                <div className="mb-4 p-3 relative">
                    <label htmlFor="department" className="mb-2 block text-gray-700 text-sm font-bold">
                        Катедра
                    </label>
                    <select
                        id="department"
                        {...register('department', {
                            required: 'Изберете катедра',
                        })}
                        className={`border ${errors.department ? 'border-red-500' : 'border-gray-200'} transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
                    >
                        <option value="">Изберете катедра</option>
                        <option value="EZIKOVA_PODGOTOVKA">Езикова подготовка</option>
                        <option value="EKSPLOATACIA_MENIDZHMANT_MORSKI_TRANSPORT">Експлоатация и мениджмънт на морския транспорт</option>
                        <option value="ELEKTRONIKA">Електроника</option>
                        <option value="ELEKTROTEHNIKA">Електротехника</option>
                        <option value="INFORMACIONNI_TEHNOLOGII">Информационни технологии</option>
                        <option value="KORABOVODENE">Корабоводене</option>
                        <option value="KORABNI_MASHINI_MEHANIZMI">Корабни машини и механизми</option>
                        <option value="MEHATRONIKA">Мехатроника</option>
                        <option value="ORGANIZACIA_UPRAVLENIE_VOENNI_FORMIRANIA">Организация и управление на военни формирования на тактическо ниво</option>
                        <option value="NACIONALNA_SIGURNOST">Национална сигурност</option>

                    </select>
                    {errors.department && <FormError error={errors.department.message} />}
                </div>

                {/* Last Name */}
                <div className="mb-4 p-3 relative">
                    <label htmlFor="lastName" className="mb-2 block text-gray-700 text-sm font-bold">
                        Фамилия
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Фамилия"
                        {...register('lastName', {
                            required: 'Въведете фамилно име',
                        })}
                        className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} transition-colors duration-200 ease-in-out focus:border-blue-500 focus:outline-none p-3 w-full rounded-md text-sm`}
                    />
                    {errors.lastName && <FormError error={errors.lastName.message} />}
                </div>

                {/* Submit button */}
                <button type="submit" className="col-span-2 w-full mt-3 py-2 text-sm text-white bg-indigo-900 hover:bg-indigo-700 transition-all rounded-md">
                    Регистрация
                </button>

                {/* Display API error */}
                {apiError && (
                    <div className="col-span-2 mt-3 font-bold text-center text-red-500">
                        {apiError}
                    </div>
                )}

                <div className="col-span-2 mt-4 text-xs">{children}</div>
            </form>

            {isLoading && <LoadingSpinner />}

        </div>
    );
};

export default SignUpForm;
