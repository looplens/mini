import { configureStore } from "@reduxjs/toolkit"

import sessionSlice from "./reducers/sessionSlice"

export const store = configureStore({
  reducer: {
    session: sessionSlice,
  },
})
