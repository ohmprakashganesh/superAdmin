import {  ShoppingCart } from "lucide-react";
import SearchInput from "./ui/Search";
import { useNavigate } from "react-router-dom";
import type React from "react";

interface NavbarProps {
  onSearch: () => void;
  onClick: () => void; 
}
 const Navbar:React.FC<NavbarProps> = () =>
    {
      const navigate=useNavigate();
    return(
  <nav className="flex  items-center justify-between px-4 py-5 bg-white  shadow shadow-gray-300 sticky top-0 z-50">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div  onClick={()=>navigate("/")} className="w-8 cursor-pointer h-8 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold italic">f</div>
      </div>
    </div>
    <div className="flex  items-center gap-2 text-gray-700">
  
     <div className=" hover:cursor-pointer hover:bg-border rounded-full p-1 ">

     </div>
         <div className="  hover:cursor-pointer hover:bg-border rounded-full p-1 ">
      <ShoppingCart onClick={()=>navigate("/cart")} size={25} />
     </div>
    </div>
  </nav>
);
}
export default Navbar;