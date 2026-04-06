import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react'; // Optional: Install lucide-react for the spinner

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
  // Define base styles to keep the return clean
  const baseStyles = "relative flex  w-fit px-4  items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed";
  
  // Default color logic
  const defaultColors = "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] focus-visible:ring-emerald-500 disabled:bg-gray-100 disabled:text-gray-400";

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${className ? className : defaultColors}`}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      )}
      
      {/* Button Content */}
      <span className={isLoading ? "opacity-70" : "opacity-100"}>
        {children}
      </span>
    </button>
  );
};

export default PrimaryBtn;