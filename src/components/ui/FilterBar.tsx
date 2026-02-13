import { Star } from "lucide-react";
import { Select } from "../formUi/Select";
import Chip from "./Chip";
import { useCart } from "../../context/CartContext";

export const categories = [
  { value: "", label: "All Categories" }, // Add empty option for "All"
  { value: "Anti-Bacterial", label: "Anti-Bacterial" },
  { value: "Lite Series", label: "Lite Series" },
  { value: "Pro Edition", label: "Pro Edition" },
  { value: "Sports", label: "Sports" },
  { value: "Rugged", label: "Rugged" },
  { value: "Value Packs", label: "Value Packs" },
  { value: "Essentials", label: "Essentials" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Limited Edition", label: "Limited Edition" },
  { value: "Flexible", label: "Flexible" },
  { value: "Breathable", label: "Breathable" },
  { value: "Clearance", label: "Clearance" }
];

export const sortOptions = [
  { value: "none", label: "Sort By Price" },
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" }
];



const FilterBar = () => {
  const { 
    setSortOrder, 
    sortOrder, 
    selectTerm, 
    setSelectTerm ,
    popular,
    setPopular,
    special,
    setSpecial,

  } = useCart(); // Assuming these are in your context
  
  return (
    <div className="mx-4">
      <div className="flex gap-x-5 w-full md:justify-end   lg:justify-end md:gap-x-10  text-sm font-medium px-2">
        {/* Sort Select */}
        <div className="flex-1 w-[250px] md:max-w-[200px] lg:max-w-[200px]">
          <Select
            // label="Sort by"
            options={sortOptions}
            value={sortOrder}
            onChange={setSortOrder}
            useCartContext={false} // Important: don't use cart context for sorting
          />
        </div>
        
        {/* Category Select */}
        <div className="flex-1">
          <Select
            // label="Category"
            options={categories}
            value={selectTerm}
            onChange={setSelectTerm}
            useCartContext={false} // Set to false since we're controlling it manually
          />
        </div>
      </div>
      
      <div className="flex gap-2 pb-3 items-center  mt-3 overflow-x-auto no-scrollbar">
       <p onClick={()=>{setPopular(!popular)}} className={` w-fit py-1 px-2   cursor-pointer`}> <Chip active={popular}  icon={<Star size={16} className="text-orange-400  " />} label="Popular" /></p> 
         <p onClick={()=>{setSpecial(!special)}} className="w-fit cursor-pointer py-1 px-2"> <Chip active={special} icon={<Star size={16} className="text-blue-500" />} label="special-products" /> </p>
      </div>
    </div>
  );
};

export default FilterBar;