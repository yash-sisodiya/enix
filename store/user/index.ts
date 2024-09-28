import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myProfileData: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateMyProfileData: (state, action) => {
      state.myProfileData = action.payload;
    },
  },
});

export const {
  updateMyProfileData,
} = slice.actions;

export default slice.reducer;
