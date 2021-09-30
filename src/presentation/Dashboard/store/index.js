import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const DashboardStore = createStore({
  name: "dashboardStore",
  initialState,
  actions,
});

export const useDashboardStore = createHook(DashboardStore, {
  selector: (state) => state,
});
