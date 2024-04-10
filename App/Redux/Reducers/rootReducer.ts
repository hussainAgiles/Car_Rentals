import { combineReducers } from '@reduxjs/toolkit';
import persistedLoginSlice from './loginReducer';
import reservationDetailSlice from './ReservationDetailsReducer';

const rootReducer = combineReducers({
    // all the reducers will be here
    loginReducer: persistedLoginSlice,
    reservationDetailReducer:reservationDetailSlice 
  });
  
  export default rootReducer;