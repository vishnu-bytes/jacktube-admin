import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const UserStore = createStore({
  name: "UserStore",
  initialState,
  actions,
});

export const useUserStore = createHook(UserStore, {
  selector: (state) => state,
});
