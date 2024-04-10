import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchResrvationDetails } from '../../API/NormalApi';

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

type InitialStateType = {
  loading: any;
  data: any;
  error: any;
};

const initialState: InitialStateType = {
  data: null,
  loading: 'idle',
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


const reservationDetailSlice = resrvationDetailSlice.reducer;

export default reservationDetailSlice;
