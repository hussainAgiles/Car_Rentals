import { combineReducers } from '@reduxjs/toolkit';
import persistedLoginSlice from './loginReducer';
import { addOns, fleetReport, fleetViolationTypes, fleetViolation, insuranceDetails, paymentHistory, paymentStatus, payments, rentalDetails, resrvationDetails, fleetCustomers, fleetViolationCreate, fleetPenaltyTypes, fleetPenaltyCreation, fleetPenaltyHistory, fleetDeleteViolation, fleetDeletePenalties, fleetCurrencySlice, fleetFetchCurrency,  } from './ReservationDetailsReducer';


const rootReducer = combineReducers({
  // all the reducers will be here
  loginReducer: persistedLoginSlice,
  reservationDetailReducer: resrvationDetails,
  rentalDetailReducer: rentalDetails,
  rentailInsuranceReducer: insuranceDetails,
  addOnsReducer: addOns,
  createPaymentReducer: payments,
  fetchPaymentReducer: paymentHistory,
  fetchPaymentStatusReducer: paymentStatus,
  fleetReportReducer: fleetReport,
  fleetVoilationReducer: fleetViolation,
  fleetViolationTypesReducer: fleetViolationTypes,
  fleetCustomersReducer: fleetCustomers,
  fleetViolationCreationReducer : fleetViolationCreate,
  fleetPenaltyTypeReducer:fleetPenaltyTypes,
  fleetPenaltyCreationReducer:fleetPenaltyCreation,
  fleetPenaltyHistoryReducer:fleetPenaltyHistory,
  fleetDeleteViolationReducer:fleetDeleteViolation,
  fleetDeletePenaltyReducer:fleetDeletePenalties,
  fleetFetchDefaultCurrencyReducer : fleetFetchCurrency
});

export default rootReducer;