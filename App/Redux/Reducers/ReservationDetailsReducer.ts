import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchInsurance, fetchRentalDetails, fetchResrvationDetails, handleAddons, createPayment, fetchPayments, updatePayment, fetchFleetReport} from '../../API/NormalApi';

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


export const fetchFleetReports = createAsyncThunk('home/fleetReport', async () => {
  try {
    const response = await fetchFleetReport();
    return response;
  } catch (error) {
    return error;
  }
});

interface paymentPayload {
  type:string,
  method: string;
  date:string;
  value:string;
  reservation_id:string;
  customer_id:string;
  
}

export const create_Payment = createAsyncThunk(
  'home/createPayment',
  async (payload: paymentPayload, {rejectWithValue}) => {
    // console.log("hello entered",payload.date);
    try {
      const response = createPayment({body: payload});
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


export const fetchPayment = createAsyncThunk(
  'home/fetchPayment',
  async (id:string, {rejectWithValue}) => {
    // console.log("id received",id);
    try {
      const response = fetchPayments(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


interface paymentStatusPayload {
  id:string
  reservation_id:string;
  status:string;
  
  
}

export const fetchStatus = createAsyncThunk(
  'home/fetchStatus',
  async (payload: paymentStatusPayload, {rejectWithValue}) => {
    // console.log("payload received",payload);
    try {
      const response = await updatePayment({body: payload});
      // console.log("Response fetch status reducers",response)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type InitialStateType = {
  loading: any;
  data: any;
  error: any;
  rentalDetail:any;
  insuranceDetail:any;
  addOns:any;
  paymentData:any;
  paymentHistory:any;
  paymentStatus:any
  fleetData:any;
};

const initialState: InitialStateType = {
  data: null,
  loading: 'idle',
  rentalDetail:null,
  insuranceDetail:null,
  error: null,
  addOns:null,
  paymentData:null,
  paymentHistory:null,
  paymentStatus:null,
  fleetData:null,
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


export const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(create_Payment.pending, state => {
        state.loading = 'pending';
      })
      .addCase(create_Payment.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.paymentData=action.payload
        state.error = null;
      })
      .addCase(create_Payment.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});

export const paymentHistorySlice = createSlice({
  name: 'paymentsHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPayment.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchPayment.fulfilled, (state, action) => {
        state.loading = 'idle';
        // console.log("truee ",action.payload)
        state.paymentHistory=action.payload
        state.error = null;
      })
      .addCase(fetchPayment.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});

export const paymentStatusSlice = createSlice({
  name: 'paymentStatus',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStatus.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = 'idle';
        // console.log("truee ",action.payload)
        state.paymentStatus=action.payload
        state.error = null;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});

export const fleetReportSlice = createSlice({
  name: 'fleetReport',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFleetReports.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchFleetReports.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.fleetData = action.payload;
        state.error = null;
      })
      .addCase(fetchFleetReports.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});




export const { reducer: resrvationDetails} = resrvationDetailSlice;
export const { reducer: rentalDetails} = rentalDetailsSlice;
export const {reducer :  insuranceDetails } = rentalInsuranceSlice;
export const {reducer :  addOns } = addonsSlice;
export const {reducer :   payments} = paymentSlice;
export const {reducer :   paymentHistory} = paymentHistorySlice;
export const {reducer :   paymentStatus} = paymentStatusSlice;
export const { reducer: fleetReport} = fleetReportSlice;


