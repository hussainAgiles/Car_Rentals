import { combineReducers } from '@reduxjs/toolkit';
import persistedLoginSlice from './loginReducer';
import { addOns, fleetReport, insuranceDetails, paymentHistory, paymentStatus, payments, rentalDetails, resrvationDetails } from './ReservationDetailsReducer';


const rootReducer = combineReducers({
    // all the reducers will be here
    loginReducer: persistedLoginSlice,
    reservationDetailReducer:resrvationDetails,
    rentalDetailReducer:rentalDetails,
    rentailInsuranceReducer:insuranceDetails,
    addOnsReducer:addOns,
    createPaymentReducer:payments,
    fetchPaymentReducer : paymentHistory,
    fetchPaymentStatusReducer : paymentStatus,
    fleetReportReducer:fleetReport,
  });
  
  export default rootReducer;