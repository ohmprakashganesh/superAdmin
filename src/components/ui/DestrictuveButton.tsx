import React, { ButtonHTMLAttributes } from 'react';

// Extend standard HTML button attributes for full compatibility
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Distructive: React.FC<ButtonProps> = ({ 
  children,   
  className = "", 
  ...props 
}) => {
  return (
    <button
      {...props}
      className={`
        w-full h-10 text-sm  font-normal py-1 border border-red-500/50 text-black  rounded-md  mt-2 
        transition-all duration-200 shadow-sm
        hover:bg-red-500 active:scale-95 
        disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none
        flex justify-center items-center gap-2
        ${className}
      `}
    >
       {children}
    </button>
  );
};

export default Distructive;