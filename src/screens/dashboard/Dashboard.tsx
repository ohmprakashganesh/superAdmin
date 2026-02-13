// components/restaurants/RestaurantList.tsx
import React, { useState } from 'react';
import type { Restaurant } from '../../types/types';
import PrimaryBtn from '../../components/ui/PrimaryBtn';
import { ClockIcon, CreditCardIcon, Layout, PlusIcon, ShieldCheck, TicketIcon, TrendingUp, TrendingUpIcon } from 'lucide-react';
import { RestaurantForm } from '../../components/formUi/ResturentForm';
import { RestaurantList } from '../../components/ui/ResturentList';
import { useRestaurants } from '../../hooks/useResturents';
import MainCard from './MainCard';
import { BuildingStorefrontIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export const Dashboard: React.FC = () => {
  const {
    restaurants,
    loading,
    error,
    selectedRestaurant,
    addRestaurant,
    editRestaurant,
    removeRestaurant,
    selectRestaurant,
  } = useRestaurants();

   console.log(restaurants);

  const [showForm, setShowForm] = useState(false);

  const handleCreateRestaurant = async (data: Restaurant) => {
    try {
      await addRestaurant(data);
      setShowForm(false);
      selectRestaurant(null);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
    }
  };

  const handleUpdateRestaurant = async (data: Restaurant) => {
    if (selectedRestaurant?._id) {
      try {
        console.log("this is form edit func"+data);
        await editRestaurant(selectedRestaurant._id, data);
        setShowForm(false);
        selectRestaurant(null);
      } catch (error) {
        console.error('Failed to update restaurant:', error);
      }
    }
  };

  const handleDeleteRestaurant = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await removeRestaurant(id);
      } catch (error) {
        console.error('Failed to delete restaurant:', error);
      }
    }
  };

  const handleEdit = (restaurant: Restaurant) => {
    selectRestaurant(restaurant);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    selectRestaurant(null);
  };

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">    
          {!showForm && (
            <div className='w-[300px] mt-290 ml-[60%] absolute'>
            <PrimaryBtn          
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className=" w-5 h-5 mr-2" />
              Add Restaurant
            </PrimaryBtn>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Stats Cards */}          
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MainCard 
    topIcon={BuildingStorefrontIcon} // Use relevant icons
    bottomIcon={TrendingUpIcon} 
    title="Total Restaurants" 
    subTitle="Active in system" 
    content={restaurants?.length || 0}
    gradientClass="from-purple-600 to-indigo-700"
  />

  <MainCard 
    topIcon={TicketIcon} 
    bottomIcon={CheckBadgeIcon} 
    title="Available Plans" 
    subTitle="Active tiers" 
    content={"static"}
    gradientClass="from-blue-600 to-cyan-700"
  />
  <MainCard 
    topIcon={CreditCardIcon} 
    bottomIcon={ClockIcon} 
    title="Total Subscriptions" 
    subTitle="Live accounts" 
    content={restaurants?.filter(r => new Date(r.subscription.endDate) > new Date()).length || 0}
    gradientClass="from-emerald-600 to-teal-700"
  />
   

        </div>
        <div className="mt-8">
          {showForm && (
            <div className='absolute bg-black/50 overflow-scroll inset-0 w-screen h-screen '>
              <div className='mx-auto w-[800px] h-[500px]'> 
            <RestaurantForm
              initialData={selectedRestaurant}
              onSubmit={selectedRestaurant ? handleUpdateRestaurant : handleCreateRestaurant}
              onCancel={handleCancel}
              loading={loading}
            />
            </div>
             </div>
          )
        }
          </div>
          
          
            <RestaurantList
              restaurants={restaurants}
              onEdit={handleEdit}
              onDelete={handleDeleteRestaurant}
              loading={loading}
            />
       
        </div>
     
  );
};
