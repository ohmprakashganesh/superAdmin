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
} from '../redux/resturentSlice';

import type { Restaurant } from '../types/types';

export const useRestaurants = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { restaurants, loading, error, selectedRestaurant } = useSelector(
    (state: RootState) => state.restaurants
  );

  useEffect(() => {
    dispatch(fetchRestaurants());
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

  return {
    restaurants,
    loading,
    error,
    selectedRestaurant,
    addRestaurant,
    editRestaurant,
    removeRestaurant,
    selectRestaurant,
  };
};