import React, { useState } from 'react'
import RestaurantList from '../../components/ui/ResturentList'
import { useRestaurants } from '../../hooks/useResturents';
import type { Restaurant } from '../../types/types';
import PrimaryBtn from '../../components/ui/PrimaryBtn';
import { PlusIcon } from 'lucide-react';
import Input from '../../components/ui/Input';
import { RestaurantForm } from '../../components/formUi/ResturentForm';
import CompanyProfile from '../profile/CompanyProfile';

const Restaurants: React.FC = () => {
  const {
    restaurants,
    loading,
    selectedRestaurant,
    isProfileOpen,
    showProfile,
    showEditForm,
    isFormOpen,
    closeModal,
    addRestaurant,
    editRestaurant,
    removeRestaurant,
    selectRestaurant,
  } = useRestaurants();

  console.log(restaurants);
  // const [showForm, setShowForm] = useState(false);

  const[searchTerm,setSearchTerm]=useState("");

  const handleCreateRestaurant = async (data: Restaurant) => {
    try {
      await addRestaurant(data);
      setShowForm(false);
      selectRestaurant(null);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
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



  const handleUpdateRestaurant = async (data: Restaurant) => {
    if (selectedRestaurant?._id) {
      try {
        await editRestaurant(selectedRestaurant._id, data);
        selectRestaurant(null);
         closeModal();
      } catch (error) {
        console.error('Failed to update restaurant:', error);
      }
    }
  };

  const handleEdit = (restaurant: Restaurant) => {
    showEditForm(restaurant);
  };
  
   const handleView = (restaurant:Restaurant)=>{
    showProfile(restaurant);
   }
  return (
    <div>
      <div className=' w-full flex  justify-between my-5 items-center'>
        <div>
          <Input onChange={(e)=>setSearchTerm(e.target.value)} placeholder='search by name' />
          </div>
        <div> {!isFormOpen && (
          <div className='w-50 '>
            <PrimaryBtn
              onClick={() => showEditForm(null)}
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
                   onView={handleView}
                   searchTerm={searchTerm}
                   loading={loading}
                 />
      {isFormOpen && (
        <div className='absolute bg-black/50 overflow-scroll inset-0 w-screen h-screen '>
          <div className='mx-auto lg:w-[70%] md:w-[55%] w-full mt-10 h-fit py-5'>

            <RestaurantForm
              initialData={selectedRestaurant}
              onSubmit={selectedRestaurant ? handleUpdateRestaurant : handleCreateRestaurant}
              onClose={closeModal}
              loading={loading}
              
            />
          </div>
        </div>
      )
      }

      {isProfileOpen && (
            <div className='absolute bg-black/50 overflow-scroll inset-0 w-screen h-screen '>
              <div className='mx-auto w-[800px] h-[500px]'> 
            <CompanyProfile
                   company={selectedRestaurant}
                    loading={loading}
                    onClose={closeModal}

            />
            </div>
             </div>
          )
        }


    </div>
  )
}
export default Restaurants;
