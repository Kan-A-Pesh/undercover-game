import { Route } from "@/types/routes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RouterState {
  route: Route;
}

const initialState: RouterState = {
  route: "home",
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Route>) => {
      state.route = action.payload;
    },
  },
});

export const { setRoute } = routerSlice.actions;

export default routerSlice.reducer;
