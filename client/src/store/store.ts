import { configureStore } from "@reduxjs/toolkit";
import { routerSlice } from "./slices/router";

export const store = configureStore({
  reducer: {
    router: routerSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
