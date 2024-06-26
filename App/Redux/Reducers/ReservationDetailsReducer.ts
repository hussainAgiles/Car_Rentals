import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createDamage, createPayment, createPenalties, createVoilation, deleteDamage, deletePenalty, deleteViolations,fetchCustomers, fetchDefaultCurrency, fetchDocument, fetchFleetReport, fetchInsurance,fetchMaintenanceReport, fetchPayments, fetchPenalty, fetchPenaltyTypes, fetchRentalDetails, fetchResrvationDetails, fetchSvg, fetchViolationTypes, fetchViolations, handleAddons, updatePayment } from '../../API/NormalApi';

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

// export const fetchInvoice = createAsyncThunk(
//   'home/fetchInvoice',
//   async (slug:any, {rejectWithValue}) => {
//     // console.log("id received",slug);
//     try {
//       const response = fetchInvoiceReport({slug:slug});
//       return response;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );

// export const fetchAgreement = createAsyncThunk(
//   'home/fetchAgreement',
//   async (slug:any, {rejectWithValue}) => {
//     // console.log("id received",slug);
//     try {
//       const response = fetchAgreementReport({slug:slug});
//       return response;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );




export const fetchSVG = createAsyncThunk(
  'home/fetchSvg',
  async (reservation_id: string, {rejectWithValue}) => {
    try {
      const response = fetchSvg(reservation_id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


// export const fetchCustomers = createAsyncThunk(
//   'home/fetchCustomers',
//   async (body: string, {rejectWithValue}) => {
//     try {
//       const response = fetchCustomer();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );


export const fetchingViolations = createAsyncThunk(
  'home/fetchViolation',
  async (id:string, { rejectWithValue }) => {
    // console.log("id in === ",id)
    try {
      const response = await fetchViolations(id)
;
      // console.log("Voilations response == ",response)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const VioltaionTypes = createAsyncThunk(
  'home/fetchVoilationTypes',
  async () => {
    try {
      const response = await fetchViolationTypes();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const Customers =createAsyncThunk(
  'home/fetchCustomers',
  async () => {
    try {
      
      const response = await fetchCustomers();
      // console.log("Customers response RDReducers == ",response);
      return response;
    } catch (error) {
      return error;
    }
  }
); 

interface violationPayload {
  type:string,
  reservation_id:string;
  customer_id:string;
  amount:string;
  description:string;
}

export const create_Violation = createAsyncThunk(
  'home/createViolation',
  async (payload: violationPayload, {rejectWithValue}) => {
    try {
      const response = createVoilation({body: payload});
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const delete_Violation = createAsyncThunk(
  'home/deleteViolation',
  async (id:string, {rejectWithValue}) => {
    try {
      const response = await deleteViolations(id)
;
      // console.log("response dlete == ",response)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const PenaltyTypes = createAsyncThunk(
  'home/PenaltyTypes',
  async () => {
    
    try {
      const response = await fetchPenaltyTypes();
      // console.log("Penalties Types response == ",response)
      return response;
    } catch (error) {
      return error;
    }
  }
);

interface penaltyPayload {
  type:string,
  description:string,
  reservation_id:string,
  price:string,
  // over_limit:string,
  // under_filling:string
}

export const create_Penalty = createAsyncThunk(
  'home/createViolation',
  async (payload: penaltyPayload, {rejectWithValue}) => {
    try {
      const response = await createPenalties({body: payload});
      // console.log("response in Penalty == ",response)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchingPenalties = createAsyncThunk(
  'home/fetchPenalties',
  async (id:string, { rejectWithValue }) => {
    try {
      const response = await fetchPenalty(id)
;
      // console.log("Voilations response == ",response)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const delete_Penalties = createAsyncThunk(
  'home/deletePenalty',
  async (id:string, {rejectWithValue}) => {
    try {
      const response =await deletePenalty(id)
;
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchingCurrency = createAsyncThunk(
  'home/fetchCurrency',
  async () => {
    try {
      const response = await fetchDefaultCurrency();
      // console.log("Currency response in reducers action == ",response)
      return response;
    } catch (error) {
      return error;
    }
  }
);


interface createDamagePayload {

  type:string;
  title:string;
  description:string;
  damage_level:string;
  vehicle_id:string;
  client_id:string;
  image_url:string;
  reservation_id:string;
  data_id:string
}

export const createDamagee = createAsyncThunk(
  'home/createDamage',
  async (payload: createDamagePayload, {rejectWithValue}) => {
    // console.log("payload received",payload);
    try {
      const response = await createDamage({body: payload});   
      // console.log("this is the respone",response) 
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);


export const deleteDamagee = createAsyncThunk(
  'home/deleteDamage',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = deleteDamage(id)
;
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchingMaintenance = createAsyncThunk(
  'home/fetchMaintenance',
  async () => {
    try {
      const response = await fetchMaintenanceReport();
      // console.log("Maintenance response in reducers action == ",response)
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const fetchKycDocuments = createAsyncThunk(
  'home/fetchDocuments',
  async (slug:any, {rejectWithValue}) => {
    // console.log("id received",slug);
    try {
      const response = fetchDocument({slug:slug});
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
  violationData:any;
  violation:any;
  violationTypes:any;
  customersData:any;
  customerLoading:any;
  penaltyTypesData:any;
  penaltyData:any;
  penaltiesHistory:any;
  defaultCurrency:any;
  // invoice:any;
  svg:any;
  customers:any;
  damage:any;
  dmgError:any;
  // agreement:any;
  maintenanceServices:any;
  kycDocuments:any
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
  violation:null,
  violationTypes:null,
  customersData:null,
  customerLoading:null,
  violationData:null,
  penaltyTypesData:null,
  penaltyData:null,
  penaltiesHistory:null,
  defaultCurrency:null,
  svg:null,
  customers:null,
  damage:null,
  dmgError:null,
  maintenanceServices:null,
  kycDocuments:null
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


// export const invoiceReportSlice = createSlice({
//   name: 'invoiceReport',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchInvoice.pending, state => {
//         state.loading = 'pending';
//       })
//       .addCase(fetchInvoice.fulfilled, (state, action) => {
//         state.loading = 'idle';
//         state.invoice = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchInvoice.rejected, (state, action) => {
//         state.loading = 'idle';
//         state.error = action.payload as string;
//       })
//   },
// });

// export const agreementReportSlice = createSlice({
//   name: 'agreementReport',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchAgreement.pending, state => {
//         state.loading = 'pending';
//       })
//       .addCase(fetchAgreement.fulfilled, (state, action) => {
//         state.loading = 'idle';
//         state.agreement = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchAgreement.rejected, (state, action) => {
//         state.loading = 'idle';
//         state.error = action.payload as string;
//       })
//   },
// });

export const svgSlice = createSlice({
  name: 'svg',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSVG.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchSVG.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.svg = action.payload;
        state.error = null;
      })
      .addCase(fetchSVG.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});


export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Customers.pending, state => {
        state.customerLoading = 'pending';
      })
      .addCase(Customers.fulfilled, (state, action) => {
        state.customerLoading = 'idle';
        state.customersData = action.payload;
        state.error = null;
      })
      .addCase(Customers.rejected, (state, action) => {
        state.customerLoading = 'idle';
        state.error = action.payload as string;
      })
  },
});


export const createDamageSlice = createSlice({
  name: 'createDamage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createDamagee.pending, state => {
        state.loading = 'pending';
      })
      .addCase(createDamagee.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.damage = action.payload;
        state.error = null;
      })
      .addCase(createDamagee.rejected, (state, action) => {
        // console.log("hsdsksdjd",action)
        state.loading = 'idle';
        state.dmgError = action.payload as string;
      })
  },
});


export const deleteDamageSlice = createSlice({
  name: 'deleteDamage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteDamagee.pending, state => {
        state.loading = 'pending';
      })
      .addCase(deleteDamagee.fulfilled, (state,) => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(deleteDamagee.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});


export const fleetViolationSlice = createSlice({
  name: 'fleetVoilation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchingViolations.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchingViolations.fulfilled, (state, action) => {
        state.loading = 'idle';
        // console.log("payload == ",action.payload)
        state.violation = action.payload;
        state.error = null;
      })
      .addCase(fetchingViolations.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetViolationTypesSlice = createSlice({
  name: 'fleetVoilationTypes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(VioltaionTypes.pending, state => {
        state.loading = 'pending';
      })
      .addCase(VioltaionTypes.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.violationTypes = action.payload;
        state.error = null;
      })
      .addCase(VioltaionTypes.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetCustomersSlice = createSlice({
  name: 'fleetCustomers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(Customers.pending, state => {
        state.customerLoading = 'pending';
      })
      .addCase(Customers.fulfilled, (state, action) => {
        state.customerLoading = 'idle';
        state.customersData = action.payload;
        state.error = null;
      })
      .addCase(Customers.rejected, (state, action) => {
        state.customerLoading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetViolationCreationSlice = createSlice({
  name: 'fleetVoilationCreation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(create_Violation.pending, state => {
        state.loading = 'pending';
      })
      .addCase(create_Violation.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.violationData = action.payload;
        state.error = null;
      })
      .addCase(create_Violation.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetPenaltyTypeSlice = createSlice({
  name: 'fetchPenaltyType',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(PenaltyTypes.pending, state => {
        state.loading = 'pending';
      })
      .addCase(PenaltyTypes.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.penaltyTypesData = action.payload;
        state.error = null;
      })
      .addCase(PenaltyTypes.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetPenaltyCreationSlice = createSlice({
  name: 'CreatePenalty',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(create_Penalty.pending, state => {
        state.loading = 'pending';
      })
      .addCase(create_Penalty.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.penaltyData = action.payload;
        state.error = null;
      })
      .addCase(create_Penalty.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetPenaltyHistorySlice = createSlice({
  name: 'fetchPenaltyHistory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchingPenalties.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchingPenalties.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.penaltiesHistory = action.payload;
        state.error = null;
      })
      .addCase(fetchingPenalties.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetPenaltyDeleteSlice = createSlice({
  name: 'deletePenalty',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(delete_Penalties.pending, state => {
        state.loading = 'pending';
      })
      .addCase(delete_Penalties.fulfilled, (state, action) => {
        state.loading = 'idle';
        // const penaltyIdToDelete = action.payload;
        // state.penaltiesHistory = state.penaltiesHistory.filter((penalty: { id: string; }) => penalty.id !== penaltyIdToDelete);;
        state.error = null;
      })
      .addCase(fetchingPenalties.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const fleetViolationDeleteSlice = createSlice({
  name: 'deleteViolation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(delete_Violation.pending, state => {
        state.loading = 'pending';
      })
      .addCase(delete_Violation.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(delete_Violation.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});


export const fleetCurrencySlice = createSlice({
  name: 'fetchCurrency',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchingCurrency.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchingCurrency.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.defaultCurrency= action.payload;
        state.error = null;
      })
      .addCase(fetchingCurrency.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const maintenanceReportSlice = createSlice({
  name: 'fetchServices',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchingMaintenance.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchingMaintenance.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.maintenanceServices= action.payload;
        state.error = null;
      })
      .addCase(fetchingMaintenance.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })   
  },
});

export const DocumentSlice = createSlice({
  name: 'Kycdocuments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchKycDocuments.pending, state => {
        state.loading = 'pending';
      })
      .addCase(fetchKycDocuments.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.kycDocuments = action.payload;
        state.error = null;
      })
      .addCase(fetchKycDocuments.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
  },
});





export const { reducer: resrvationDetails} = resrvationDetailSlice;
export const { reducer: rentalDetails} = rentalDetailsSlice;
export const {reducer : insuranceDetails } = rentalInsuranceSlice;
export const {reducer : addOns } = addonsSlice;
export const {reducer : payments} = paymentSlice;
export const {reducer : paymentHistory} = paymentHistorySlice;
export const {reducer : paymentStatus} = paymentStatusSlice;
export const { reducer: fleetReport} = fleetReportSlice;
export const { reducer: fleetViolation} = fleetViolationSlice;
export const { reducer: fleetViolationTypes} = fleetViolationTypesSlice;
export const { reducer: fleetCustomers} = fleetCustomersSlice;
export const { reducer: fleetViolationCreate} = fleetViolationCreationSlice;
export const { reducer: fleetPenaltyTypes} = fleetPenaltyTypeSlice;
export const { reducer: fleetPenaltyCreation} = fleetPenaltyCreationSlice;
export const { reducer: fleetPenaltyHistory} = fleetPenaltyHistorySlice;
export const { reducer: fleetDeleteViolation} = fleetViolationDeleteSlice;
export const { reducer: fleetDeletePenalties} = fleetPenaltyDeleteSlice;
export const { reducer: fleetFetchCurrency} = fleetCurrencySlice;
// export const { reducer: invoiceReport} = invoiceReportSlice;
export const { reducer: svg} = svgSlice;
export const { reducer: customers} = customersSlice;
export const { reducer: damage} = createDamageSlice;
export const { reducer: deleteDamageReducer} = deleteDamageSlice;
export const { reducer: maintenanceReport} = maintenanceReportSlice;
export const { reducer: kycDocument} = DocumentSlice;

