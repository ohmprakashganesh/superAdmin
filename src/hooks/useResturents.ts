// hooks/useRestaurants.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

import {
  fetchRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  setSelectedRestaurant,
  openEditForm,
  openProfile,
  cancelModal,
  fetchPlans, 
} from '../redux/resturentSlice';

import type { Restaurant } from '../types/types';

export const useRestaurants = () => {
  const dispatch = useDispatch<AppDispatch>();
 const { 
    restaurants,
    loading, 
    error, 
    selectedRestaurant, 
    isFormOpen, 
    isProfileOpen 
  } = useSelector((state: RootState) => state.restaurants);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchPlans());
  }, [dispatch]);

  const addRestaurant = (restaurantData: Restaurant) => {
    return dispatch(createRestaurant(restaurantData));
  };

  const editRestaurant = (id: string, restaurantData: Partial<Restaurant>) => {
    return dispatch(updateRestaurant({ id, data: restaurantData }));
  };

  const removeRestaurant = (id: string) => {
    return dispatch(deleteRestaurant(id));
  };

  const selectRestaurant = (restaurant: Restaurant | null) => {
    dispatch(setSelectedRestaurant(restaurant));
  };
   const showProfile=(restaurant:Restaurant)=>{
   return dispatch(openProfile(restaurant));
   };

    const showEditForm=(restaurant:Restaurant)=>{
      return dispatch(openEditForm(restaurant));
    };
    
    const closeModal = () => {
    return dispatch(cancelModal()); 
  };

 return {
    restaurants,
    loading,
    error,
    selectedRestaurant,
    isFormOpen,    // Now correctly returned from selector
    isProfileOpen, // Now correctly returned from selector
    addRestaurant,
    editRestaurant,
    removeRestaurant,
    selectRestaurant,
    showEditForm,
    showProfile,
    closeModal,
  };
};