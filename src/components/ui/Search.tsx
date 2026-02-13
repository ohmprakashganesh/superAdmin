import React, { type ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// interface SearchProps {
//   placeholder?: string;
//   onChange:(value:string|number)=>void;
// }

const SearchInput: React.FC = () => {
  const { searchTerm, setSearchTerm } = useCart();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };
  return (
    <div className="relative w-[80%] mx-auto  max-w-md ">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-8 text-gray-400" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={"search by name"}
        className=" shadow-gray-400  shadow-lg block bg-gray-400/20 w-full py-4 px-2 pl-10 text-sm border border-stroke rounded-lg bg-surface focus:border-stroke-strong outline-none"
      />

      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
