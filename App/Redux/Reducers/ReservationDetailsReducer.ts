import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRentalDetails, fetchResrvationDetails } from '../../API/NormalApi';

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

type InitialStateType = {
  loading: any;
  data: any;
  error: any;
  rentalDetail:any
};

const initialState: InitialStateType = {
  data: null,
  loading: 'idle',
  rentalDetail:null,
  error: null,
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


export const { reducer: resrvationDetails} = resrvationDetailSlice;
export const { reducer: rentalDetails} = rentalDetailsSlice;

