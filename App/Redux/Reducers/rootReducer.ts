import { combineReducers } from '@reduxjs/toolkit';
import persistedLoginSlice from './loginReducer';
import { rentalDetails, resrvationDetails } from './ReservationDetailsReducer';


const rootReducer = combineReducers({
    // all the reducers will be here
    loginReducer: persistedLoginSlice,
    reservationDetailReducer:resrvationDetails,
    rentalDetailReducer:rentalDetails
  });
  
  export default rootReducer;