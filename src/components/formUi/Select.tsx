import { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
   onChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "success" | "error";
  useCartContext?: boolean;
}

export const Select = ({
  label,
  options,
  onChange,
  className = "",
  variant = "default",
  value,
  useCartContext = true,
}: SelectProps) => {
  const { selectTerm } = useCart();
  const selectedValue = useCartContext ? selectTerm : value;

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === selectedValue);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const baseStyle =
    " w-full mt-4 md:max-w-[200px] lg:max-w-[200px] px-3 py-2 bg-white text-xs text-gray-800 border rounded-md cursor-pointer flex items-center justify-between";

  const variants = {
    default: "border-border focus:ring-blue-400"
  };

  return (
    <div className={`w-full relative ${className}`} ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${baseStyle} ${variants[variant]}`}
      >
        <span>{selectedOption?.label ?? "Select option"}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute  md:gap-10 overflow-y-scroll w-full md:max-w-[200px] lg:max-w-[200px] z-50 mt-1 max-h-60 rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 ${
                opt.value === selectedValue ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
