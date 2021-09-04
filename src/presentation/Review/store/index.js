import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const StudentStore = createStore({
  name: "StudentStore",
  initialState,
  actions,
});

export const useReviewStore = createHook(StudentStore, {
  selector: (state) => state,
});
