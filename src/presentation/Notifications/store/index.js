import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const NotificationStore = createStore({
  name: "StudentStore",
  initialState,
  actions,
});

export const useNotificationStore = createHook(NotificationStore, {
  selector: (state) => state,
});
