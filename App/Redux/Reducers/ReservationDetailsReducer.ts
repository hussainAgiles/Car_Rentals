import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInsurance, fetchRentalDetails, fetchResrvationDetails, handleAddons } from '../../API/NormalApi';

export const fetchReservation = createAsyncThunk(
  'home/reservedVehicles',
  async () => {
    try {
      const response = await fetchResrvationDetails();
      return response;
    } catch (error) {
      return error;
    }
});

export const fetchRentalDetail = createAsyncThunk('home/rentalDetails', async (body: string, { rejectWithValue }) => {
  try {
    const response = await fetchRentalDetails({body});
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchInsuranceDetails = createAsyncThunk('home/insuranceDetails', async (body: string, { rejectWithValue }) => {
  try {
    const response = await fetchInsurance({body});
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

interface fetchAddons {
  model_id: string;
  frequency: string;
 
}

export const fetchAddons = createAsyncThunk(
  'home/fetchAddons',
  async ({ model_id, frequency }:fetchAddons, { rejectWithValue }) => {
    
    try {
      const response = await handleAddons({ model_id, frequency});
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type InitialStateType = {
  loading: any;
  data: any;
  error: any;
  rentalDetail:any;
  insuranceDetail:any;
  addOns:any;
};

const initialState: InitialStateType = {
  data: null,
  loading: 'idle',
  rentalDetail:null,
  insuranceDetail:null,
  error: null,
  addOns:null
};

export const resrvationDetailSlice = createSlice({
  name: 'reservedVehicles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchReservation.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchReservation.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
        state.error = null;
        // You can handle the successful registration here if needed
      })
      .addCase(fetchReservation.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});


export const rentalDetailsSlice = createSlice({
  name: 'rentalDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRentalDetail.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchRentalDetail.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.rentalDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchRentalDetail.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});


export const rentalInsuranceSlice = createSlice({
  name: 'insuranceDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchInsuranceDetails.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchInsuranceDetails.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.insuranceDetail = action.payload
        state.error = null;
      })
      .addCase(fetchInsuranceDetails.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});



export const addonsSlice = createSlice({
  name: 'addOns',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAddons.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.addOns = action.payload
        state.error = null;
      })
      .addCase(fetchAddons.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});


export const { reducer: resrvationDetails} = resrvationDetailSlice;
export const { reducer: rentalDetails} = rentalDetailsSlice;
export const {reducer :  insuranceDetails } = rentalInsuranceSlice;
export const {reducer :  addOns } = addonsSlice;

