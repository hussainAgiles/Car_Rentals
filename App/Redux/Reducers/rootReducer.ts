import { combineReducers } from '@reduxjs/toolkit';
import persistedLoginSlice from './loginReducer';

const rootReducer = combineReducers({
    // all the reducers will be here
    loginReducer: persistedLoginSlice
  });
  
  export default rootReducer;