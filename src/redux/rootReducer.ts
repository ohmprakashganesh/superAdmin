// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import restaurantReducer from '../redux/resturentSlice';


const rootReducer = combineReducers({
  restaurants: restaurantReducer ,
});
export default rootReducer;

