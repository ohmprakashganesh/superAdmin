// hooks/useRestaurants.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

import {
  createPlan,
  updatePlan,
  deletePlan,
  fetchSummery,
  fetchPlans,
  openEditForm,
  cancelModal,
  setSelectedPlan, 
} from '../redux/resturentSlice';

import type { Restaurant } from '../types/types';
import type { Plan } from '../screens/plans/planType';

export const usePlan= () => {
  const dispatch = useDispatch<AppDispatch>();
 const { 
    loading, 
    plans,
    summery,
    error, 
    selectedPlan
  } = useSelector((state: RootState) => state.restaurants);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchSummery());
  }, [dispatch]);

   console.log(plans);
  const addPlan = (planData: Plan) => {
    return dispatch(createPlan(planData));
  };

  const editPlan = (id: string, planData:Plan) => {
    return dispatch(updatePlan({ id, data: planData }));
  };

  const removePlan = (id: string|number) => {
    return dispatch(deletePlan(id));
  };

  const selectPlan = (plan: Plan | null) => {
    dispatch(setSelectedPlan(plan));
  };

    const showEditForm=(restaurant:Restaurant)=>{
      return dispatch(openEditForm(restaurant));
    };

    const closeModal = () => {
    return dispatch(cancelModal()); 
  };

 return {
    loading,
    plans,
    summery,
    error,
    addPlan,
    editPlan,
    removePlan,
    selectPlan,
    showEditForm,
    selectedPlan,
    closeModal,
  };
};