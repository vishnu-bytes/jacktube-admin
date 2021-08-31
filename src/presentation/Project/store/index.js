import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const CourseStore = createStore({
  name: "CourseStore",
  initialState,
  actions,
});

export const useCourseStore = createHook(CourseStore, {
  selector: (state) => state,
});
