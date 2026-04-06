// components/restaurants/RestaurantList.tsx
import React from 'react';
import type { Restaurant } from '../../types/types';
import RestaurantTable from './RestaurantTable';
import Pagination from './Pagination';


interface RestaurantListProps {
  restaurants: Restaurant[];
  onEdit: (restaurant: Restaurant) => void;
  onView:(restaurant:Restaurant)=>void;
  loading?: boolean;
  searchTerm:string;
}


export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  searchTerm,
  onEdit,
  onView,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}

      </div>
    );
  }

  if (restaurants?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No restaurants found</p>
        <p className="text-gray-400 mt-2">Click "Add Restaurant" to create your first restaurant</p>
      </div>
    );
  }
 console.log(restaurants);
  return (
    <div className="w-full gap-6">
      {
        <RestaurantTable
         searchTerm={searchTerm}
          restaurants={restaurants}
          onEdit={onEdit}
          onView={onView}
          
        />
      }
    </div>
  );
};

export default RestaurantList;