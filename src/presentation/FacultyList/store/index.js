import { createStore, createHook,defaults } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

defaults.devtools=true
const FacultyStore = createStore({
  name: "FacultyStore",
  initialState,
  actions,
});

export const useFacultyStore = createHook(FacultyStore, {
  selector: (state) => state,
});
