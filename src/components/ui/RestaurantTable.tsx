import React, { useEffect, useState } from 'react';
import { PencilIcon, TrashIcon, CalendarIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import type { Restaurant } from '../../types/types';
import DeleteModal from './DeleteModal';
import { EyeClosed } from 'lucide-react';

interface RestaurantTableProps {
  restaurants: Restaurant[];
  onEdit: (restaurant: Restaurant) => void;
  onView:(restaurant:Restaurant) =>void;
  searchTerm:string;
}

export const RestaurantTable: React.FC<RestaurantTableProps> = ({
  searchTerm,
  onEdit,
  onView,
  restaurants
}) => {
  const [show,setShow]=useState(false);
  const [filtered,setFiltered]=useState<Restaurant[]>([]);


useEffect(() => {
  if (!restaurants) return;

  let data = [...restaurants];

  if (searchTerm) {
    data = data.filter((e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  setFiltered(data);
}, [searchTerm, restaurants]);

  const doDelete=(id:string)=>{
    setShow(true);
    alert("delete");
  }


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 uppercase text-[11px] font-bold tracking-wider text-gray-500">
              <th className="px-6 py-4">Restaurant</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Tables</th>
              <th className="px-6 py-4">Subscription</th>
              <th className="px-6 py-4">Dates</th>
           <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered?.map((restaurant) => (
              <tr key={restaurant._id} className="hover:bg-gray-50/80 transition-colors group">
                {/* Restaurant Identity */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{restaurant.name}</div>
                </td>

                {/* Slug */}
                <td className="px-6 py-4 text-gray-600">
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700">
                    {restaurant.slug}
                  </code>
                </td>

                {/* Tables */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <span className="font-medium">{restaurant.tables}</span>
                  </div>
                </td>

                {/* Subscription Badge */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                    ${restaurant.subscription.plan == 'Premium' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'}`}>
                    {restaurant.subscription.plan}
                  </span>
                </td>

                {/* Dates */}
                <td className="px-6 py-4">
                  <div className="flex flex-col text-xs text-gray-600 gap-1">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3 text-emerald-500" />
                      <span>{restaurant.subscription.startDate}</span>-<span>{restaurant.subscription.endDate}</span>

                    </div>                 
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col text-xs text-gray-600 gap-1">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3 text-emerald-500" />
                      <span>{restaurant?.subscription.status}</span>

                    </div>                 
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2  group-hover:font-semibold transition-opacity">
                   
                    <button
                      onClick={() => onView(restaurant)}
                      className="rounded p-1.5 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      title="Edit Restaurant"
                    >
                      <EyeClosed className="h-4 w-4 text-shadow-muted" />
                    </button>
                     <button
                      onClick={() => onEdit(restaurant)}
                      className="rounded p-1.5 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      title="Edit Restaurant"
                    >
                      <PencilIcon className="h-4 w-4 text-shadow-muted" />
                    </button>
                    <button
                      onClick={() => restaurant._id && doDelete(restaurant._id)}
                      className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete Restaurant"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {
        show&&(
          <DeleteModal show={show} setShow={setShow} />
        )
      }

    </div>
  );
};
export default RestaurantTable;