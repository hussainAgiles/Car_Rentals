import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleReservationCard } from "../../API/NormalApi";


type ResrvationData = {
    full_name:string,
    vehicle_id: number;
    frequency:string;
    pickup_date:Date;
    dropoff_date:Date;
    image_url:string

  };
    
    
  type InitialStateType = {
    Reservation: ResrvationData[];
    loading:any,
    error:any,
  };
    
    
  const initialState: InitialStateType = {
    Reservation: [],
    loading: 'idle',
    error: null,
  };
    
    export const reservationSlice = createSlice({
      name: 'reservationDetails',
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchReservationDetails.pending, (state) => {
            state.loading = 'pending';
          })
          .addCase(fetchReservationDetails.fulfilled, (state,action) => {
            state.loading = 'idle';
            state.error = null;
            // You can handle the successful registration here if needed
          })
          .addCase(fetchReservationDetails.rejected, (state, action) => {
            state.loading = 'idle';
            state.error = action.payload as string;
          });
      },
    });

export const fetchReservationDetails = createAsyncThunk(
    'home/fetchReservationDetails',
    async ({rejectWithValue}) => {
      try {
        const response = await handleReservationCard();
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );


  export const { reducer: reservationSlider } = reservationSlice;