import  { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={menuRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => {setIsOpen(!isOpen) ,setIsOpen(!isOpen)}}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-500 overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Popup */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
          <div className="px-4 py-2 border-b border-gray-50 mb-1">
            <p className="text-sm font-semibold text-gray-900">Ganesh Kumar</p>
            <p className="text-xs text-gray-500 truncate">ganesh@restaurant.com</p>
          </div>
          <button 
            onClick={() => {navigate("/login"); setIsOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default UserMenu;