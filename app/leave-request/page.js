import React from 'react';
import VacationForm from '../components/VacationForm';

const VacationRequestPage = () => {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div 
        className="absolute bottom-0 right-20 w-[700px] h-[700px] z-0 bg-cover bg-no-repeat transform rotate-[35deg] opacity-20"
        style={{ backgroundImage: "url('/anchor.png')" }}
      />
      <div className="bg-white p-10 py-12 z-10 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className='text-center text-4xl mb-4 text-gray-500 font-light'>
          Заявете отпуск
        </h2>
        
        {/* Informational text about vacation days */}
        <p className="text-center text-gray-600 mb-6 text-sm">
          Моля, имайте предвид, че служител не може да вземе повече от 20 работни дни отпуск наведнъж.
        </p>

        <VacationForm />
      </div>
    </div>
  );
};

export default VacationRequestPage;
