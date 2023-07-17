import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/user"

export const store = configureStore({
  reducer:{
    user:userSlice,
  }
})
