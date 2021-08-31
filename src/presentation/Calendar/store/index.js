import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const CalenderStore = createStore({
  name: "CalenderStore",
  initialState,
  actions,
});

export const useCalenderStore = createHook(CalenderStore, {
  selector: (state) => state,
});
