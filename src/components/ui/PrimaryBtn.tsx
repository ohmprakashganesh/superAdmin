import React, { ButtonHTMLAttributes } from 'react';

// Extend standard HTML button attributes for full compatibility
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
   children: React.ReactNode;
}

const PrimaryBtn: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  disabled, 
  className, 
  ...props 
}) => {
  return (
    <button
      {...props}
      className={`
        w-[90%] md:w-full md:mt-1 h-[47px] md:py-6 mx-auto text-sm font-semibold py-1  rounded-md mt-2 
        transition-all duration-200 shadow-sm
        hover:bg-blue-700 active:scale-95 
        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none
        flex justify-center items-center gap-2
        ${className? className:"bg-gradient-to-r from-green-500 to-emerald-600 text-white"}
      `}
    >
       { children}
 
    </button>
  );
};

export default PrimaryBtn;