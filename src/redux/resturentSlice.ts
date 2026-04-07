// store/slices/restaurantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Restaurant, RestaurantState } from '../types/types';
import * as api from '../services/api';
import type { Plan } from '../screens/plans/planType';


const initialState: RestaurantState = {
  restaurants: [],
  plans:[],
  summery:[],
  loading: false,
  error: null,
  selectedRestaurant: null,
  selectedPlan:null,
  isFormOpen:false,
  isProfileOpen:false,
  sideStatus:false,
};

// Async thunks
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchAll',
  async () => {
    const response = await api.getRestaurants();
    return response.data;
  }
);

export const createRestaurant = createAsyncThunk(
  'restaurants/create',
  async (restaurantData:Restaurant) => {
    const response = await api.createRestaurant(restaurantData);
    return response;
  }
);

export const updateRestaurant = createAsyncThunk(
  'restaurants/update',
  async ({ id, data }: { id: string; data: Partial<Restaurant> }) => {
    const response = await api.updateRestaurant(id, data);
    return response;
  }
);

export const deleteRestaurant = createAsyncThunk(
  'restaurants/delete',
  async (id: string) => {
    await api.deleteRestaurant(id);
    return id;
  }
);

export const createPlan=createAsyncThunk(
  'plan/create',
  async(plan:Plan)=>{
   const response= await api.createPlan(plan);
    return  response;
  }
)

export const updatePlan=createAsyncThunk(
  'plan/update',
  async({id,data}:{id:string|number, data:Plan})=>{
    await api.updatePlan(id,data);
    return data;
  }
)

export const fetchPlans=createAsyncThunk(
  'plan/fetchAll',
  async()=>{
   const response= await api.allPlans();
    return  response.data;
  }
)

export const deletePlan=createAsyncThunk(
  'plan/delete',
  async(id:number|string)=>{
    await api.deletePlan(id);
    return  id;
  }
)

export const fetchSummery=createAsyncThunk(
  `/summery`,
  async()=>{
    const response= await api.summery();
    return response.data;
  }
)















const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    cancelModal:(state)=>{
      state.isFormOpen=false;
      state.isProfileOpen=false;
      state.selectedRestaurant=null;
    },
    openEditForm:(state,action:PayloadAction<Restaurant>)=>{
      state.selectedRestaurant=action.payload;
      state.isFormOpen=true;
      state.isProfileOpen=false;
    },
    openProfile:(state,action:PayloadAction<Restaurant>)=>{
      state.selectedRestaurant=action.payload;
      state.isFormOpen=false;
      state.isProfileOpen=true;
    },
    setSelectedRestaurant: (state, action: PayloadAction<Restaurant | null>) => {
      state.selectedRestaurant = action.payload;
    },
     setSelectedPlan: (state, action: PayloadAction<Plan | null>) => {
      state.selectedPlan = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSideStatus:(state)=>{
      state.sideStatus=!state.sideStatus;
    }
  },
  extraReducers: (builder) => {  
    builder
      // Fetch restaurants
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload||[];
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch restaurants';
      })
      // Create restaurant
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.restaurants.push(action.payload);
      })
      // Update restaurant
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const index = state.restaurants.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }
      })
      // Delete restaurant
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(r => r._id !== action.payload);
      })


      //fetch summery
     .addCase(fetchSummery.fulfilled, (state, action) => {
       state.summery = action.payload;
      })
      .addCase(fetchPlans.fulfilled,(state,action)=>{
        state.plans=action.payload;
      })

.addCase(createPlan.fulfilled, (state, action) => {
  state.plans.push(action.payload);
})
.addCase(updatePlan.fulfilled, (state, action) => {
  const index = state.plans.findIndex(p => p.id === action.payload.id);
  if (index !== -1) state.plans[index] = action.payload;
})
 .addCase(deletePlan.fulfilled, (state, action) => {
  state.plans = state.plans.filter(p => p.id !== action.payload);
})
  },
});

export const { setSelectedRestaurant,setSelectedPlan, clearError,cancelModal,openEditForm,openProfile,setSideStatus } = restaurantSlice.actions;
export default restaurantSlice.reducer;