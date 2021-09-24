import { createStore, createHook ,defaults} from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";
 
defaults.devtools=true;

const StudentStore = createStore({
  name: "StudentStore",
  initialState,
  actions,
});

export const useStudentStore = createHook(StudentStore, {
  selector: (state) => state,
});
