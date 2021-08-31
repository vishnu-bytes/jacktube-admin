import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const StudentStore = createStore({
  name: "StudentStore",
  initialState,
  actions,
});

export const useStudentStore = createHook(StudentStore, {
  selector: (state) => state,
});
