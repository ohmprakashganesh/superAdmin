import React from 'react';

interface StatusToggleProps {
  status?: boolean;
  onToggle?: (newStatus: boolean) => void;
  disabled?: boolean;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ 
  status, 
  onToggle, 
  disabled = false 
}) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
    
      <button
        type="button"
        onClick={() => !disabled && onToggle(!status)}
        disabled={disabled}
        className={`
          relative inline-flex h-4 w-6 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out 
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${status ? 'bg-emerald-500' : 'bg-gray-200'}
        `}
      >
        <span className="sr-only">Toggle Status</span>
        
        {/* Slider "Ball" */}
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block size-3 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${status ? 'translate-x-2' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};

export default StatusToggle;