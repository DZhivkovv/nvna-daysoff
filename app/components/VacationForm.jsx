"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import FormError from './auth/FormError';
import useLoading from '../hooks/useLoader';
import LoadingSpinner from './LoadingSpinner';

const VacationForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);

  const requestDaysOff = async (data) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await fetch('/api/leaveRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      router.replace('/account');
    } catch (error) {
      setLoading(false);
      setErrorMessage('Failed to submit form. Please try again.'); // Display error message
    }
  };

  const onSubmit = (data) => {
    const { 'daysoff-start': startDate, 'daysoff-end': endDate } = data;
    

    if (endDate < startDate) {
      setErrorMessage('Краят на отпуската не може да бъде преди нейното начало.'); 
      return; 
    }

    const differenceInDays = Math.floor(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays > 20) {
        setErrorMessage('Не можете да вземете повече от 20 дни отпуск.'); 
        return; 
    }
    requestDaysOff(data);
  };
  
  return (
    <form
      className='mx-auto bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-lg px-8 py-4 w-full max-w-lg'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='mb-6'>
        <label htmlFor='daysoff-start' className='block text-blue-800 font-semibold mb-2'>
          Начало на отпуск:
        </label>
        <input
          type='date'
          id='daysoff-start'
          name='daysoff-start'
          {...register('daysoff-start', {
            required: "Полето е задължително",
          })}
          className={`border border-blue-300 rounded-lg py-2 px-4 w-full`}
          />
        {errors['daysoff-start'] && <FormError error={errors['daysoff-start'].message} />}
      </div>

      <div className='mb-6'>
        <label htmlFor='daysoff-end' className='block text-blue-800 font-semibold mb-2'>
          Край  на отпуск:
        </label>
        <input
          type='date'
          id='daysoff-end'
          name='daysoff-end'
          {...register('daysoff-end', {
            required: "Полето е задължително",
          })}
          className={`border border-blue-300 rounded-lg py-2 px-4 w-full`}
        />
        {errors['daysoff-end'] && <FormError error={errors['daysoff-end'].message} />}
      </div>

      {/* Error message section */}

      {errorMessage && (
        <div className="text-red-500 mb-4 font-semibold">{errorMessage}</div>
      )}
      <button
        type='submit'
        className='py-2 px-4 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all w-full'
      >
        Пуснете молба за отпуск
      </button>
      
      {/* Loading spinner */}
      {isLoading && <LoadingSpinner/>}
    </form>
  );
};

export default VacationForm;
