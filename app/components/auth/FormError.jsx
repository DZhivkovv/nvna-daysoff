import React from 'react';
import { AiFillWarning } from "react-icons/ai";

// Текст, показващ грешки при автентификация (например: твърде кратка парола).
const FormError = ({ error }) => {
  return (
    <div className='absolute mt-1'>
      <div className='flex items-center'>
        <AiFillWarning className='text-red-600 mr-2' />
        <p className="text-red-500 text-xs font-bold">
          {error}
        </p>
      </div>
    </div>
  );
}

export default FormError;