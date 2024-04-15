import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleLogin} from '../../API/NormalApi';
import { setClientToken } from '../../API/APIClients';

interface loginPayload {
  email: string;
  password: string;
  usertype: string;
}

export const login = createAsyncThunk(
  'home/login',
  async (payload: loginPayload, {rejectWithValue}) => {
    try {
      const response = await handleLogin({body: payload});
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type InitialStateType = {
  loading: any;
  userData: any;
  error: any;
};

const initialState: InitialStateType = {
  userData: null,
  loading: 'idle',
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.userData = action.payload;
        state.error = null;
        // You can handle the successful registration here if needed
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      })
      .addCase(logout().type, state => {
        state.loading = 'idle';
        state.userData = null;
        state.error = null;
      });
  },
});

export const logout = () => ({type: 'login/logout'});

const persistConfig = {
  key: 'userData',
  storage: AsyncStorage,
};

const persistedLoginSlice = persistReducer(persistConfig, loginSlice.reducer);

export default persistedLoginSlice;
