// store/slices/restaurantSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Restaurant, RestaurantState } from '../types/types';
import * as api from '../services/api';


const initialState: RestaurantState = {
  restaurants: [],
  loading: false,
  error: null,
  selectedRestaurant: null,
};

// Async thunks
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchAll',
  async () => {
    const response = await api.getRestaurants();
    return response;
  }
);

export const createRestaurant = createAsyncThunk(
  'restaurants/create',
  async (restaurantData:Restaurant) => {
    const response = await api.createRestaurant(restaurantData);
    return response.data;
  }
);

export const updateRestaurant = createAsyncThunk(
  'restaurants/update',
  async ({ id, data }: { id: string; data: Partial<Restaurant> }) => {
    const response = await api.updateRestaurant(id, data);
    return response.data;
  }
);

export const deleteRestaurant = createAsyncThunk(
  'restaurants/delete',
  async (id: string) => {
    await api.deleteRestaurant(id);
    return id;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setSelectedRestaurant: (state, action: PayloadAction<Restaurant | null>) => {
      state.selectedRestaurant = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
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
        state.restaurants = action.payload;
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
        const index = state.restaurants.findIndex(r => r._id === action.payload.id);
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }
      })
      // Delete restaurant
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(r => r._id !== action.payload);
      });
  },
});

export const { setSelectedRestaurant, clearError } = restaurantSlice.actions;
export default restaurantSlice.reducer;