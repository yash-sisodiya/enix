import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface serverUrl {
  authToken: string | null;
}

const initialState: serverUrl = {
  authToken: null,
};

export const AuthToken = createSlice({
  name: 'AuthToken',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    clearAuthToken: state => {
      state.authToken = null;
    },
  },
});

export const { clearAuthToken, setAuthToken } = AuthToken.actions;

export default AuthToken.reducer;
