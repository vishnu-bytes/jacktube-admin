import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const WebinarStore = createStore({
  name: "WebinarStore",
  initialState,
  actions,
});

export const useVideoStore = createHook(WebinarStore, {
  selector: (state) => state,
});
