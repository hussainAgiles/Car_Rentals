import { combineReducers } from '@reduxjs/toolkit';
import persistedLoginSlice from './loginReducer';
import { addOns, insuranceDetails, rentalDetails, resrvationDetails } from './ReservationDetailsReducer';


const rootReducer = combineReducers({
    // all the reducers will be here
    loginReducer: persistedLoginSlice,
    reservationDetailReducer:resrvationDetails,
    rentalDetailReducer:rentalDetails,
    rentailInsuranceReducer:insuranceDetails,
    addOnsReducer:addOns
  });
  
  export default rootReducer;