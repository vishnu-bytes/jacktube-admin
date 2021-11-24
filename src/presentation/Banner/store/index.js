import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const BannerStore = createStore({
  name: "BannerStore",
  initialState,
  actions,
});

export const useBannerStore = createHook(BannerStore, {
  selector: (state) => state,
});
