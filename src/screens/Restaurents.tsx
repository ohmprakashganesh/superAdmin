import React, { useState } from 'react'
import RestaurantList from '../components/ui/ResturentList'
import { useRestaurants } from '../hooks/useResturents';
import type { Restaurant } from '../types/types';
import PrimaryBtn from '../components/ui/PrimaryBtn';
import { PlusIcon } from 'lucide-react';
import Input from '../components/ui/Input';
import { RestaurantForm } from '../components/formUi/ResturentForm';

const Restaurants: React.FC = () => {

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
  const handleCancel = () => {
    setShowForm(false);
    selectRestaurant(null);
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
  const handleUpdateRestaurant = async (data: Restaurant) => {
    if (selectedRestaurant?._id) {
      try {
        await editRestaurant(selectedRestaurant._id, data);
        setShowForm(false);
        selectRestaurant(null);
      } catch (error) {
        console.error('Failed to update restaurant:', error);
      }
    }
  };
  const handleEdit = (restaurant: Restaurant) => {
    selectRestaurant(restaurant);
    setShowForm(true);
  };

  return (
    <div>
      <div className=' w-full flex  justify-between my-5 items-center'>
        <div><Input placeholder='search by name' /></div>
        <div> {!showForm && (
          <div className='w-50 '>
            <PrimaryBtn
              onClick={() => setShowForm(true)}
            >
              <PlusIcon className=" w-5 h-5 mr-2" />
              Add Restaurant
            </PrimaryBtn>
          </div>
        )}</div>
      </div>
      <RestaurantList
        restaurants={restaurants}
        onEdit={handleEdit}
        onDelete={handleDeleteRestaurant}
        loading={loading}
      />
      {showForm && (
        <div className='absolute bg-black/50 overflow-scroll inset-0 w-screen h-screen '>
          <div className='mx-auto lg:w-[70%] md:w-[55%] w-full mt-10 h-fit py-5'>


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
  )
}
export default Restaurants;
