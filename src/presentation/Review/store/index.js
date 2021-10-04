import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const ReviewStore = createStore({
  name: "ReviewStore",
  initialState,
  actions,
});

export const useReviewStore = createHook(ReviewStore, {
  selector: (state) => state,
});
