import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const AdminStore = createStore({
  name: "AdminStore",
  initialState,
  actions,
});

export const useAdminStore = createHook(AdminStore, {
  selector: (state) => state,
});
