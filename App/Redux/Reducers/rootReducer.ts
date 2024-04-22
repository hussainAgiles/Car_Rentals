import { combineReducers } from '@reduxjs/toolkit';
import { addOns, customers, damage, deleteDamageReducer, fleetCustomers, fleetDeletePenalties, fleetDeleteViolation, fleetPenaltyCreation, fleetPenaltyHistory, fleetPenaltyTypes, fleetReport, fleetViolation, fleetViolationCreate, fleetViolationTypes, insuranceDetails, invoiceReport, paymentHistory, paymentStatus, payments, rentalDetails, resrvationDetails, svg, } from './ReservationDetailsReducer';
import persistedLoginSlice from './loginReducer';


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
  invoiceReportReducer: invoiceReport,
  fetchSvgReducer: svg,
  fetchCustomers:customers,
  createDamage:damage,
  deleteDamageReducer:deleteDamageReducer
});

export default rootReducer;