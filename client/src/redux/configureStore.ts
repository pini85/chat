import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userSlice, UserState } from "./slices/user.slice";

export interface RootState {
  user: UserState;
}

const reducers = combineReducers({
  user: userSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
