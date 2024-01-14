// Import the createSlice API from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: "",
  session_activated: false,
  nav_animation: false,
  user: {}
}

export const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUpdateNavAnimation: (state, action) => {
      state.nav_animation = action.payload;
    },
    setSessionStatus: (state, action) => {
      state.session_activated = action.payload;
    },
  },
});

export const { setUser, setToken, setSessionStatus, setUpdateNavAnimation } = sessionSlice.actions;

export default sessionSlice.reducer;
