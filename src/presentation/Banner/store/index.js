import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const BnnerStore = createStore({
  name: "BnnerStore",
  initialState,
  actions,
});

export const useBannerStore = createHook(BnnerStore, {
  selector: (state) => state,
});
