import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const BlogStore = createStore({
  name: "BlogrStore",
  initialState,
  actions,
});

export const useBlogStore = createHook(BlogStore, {
  selector: (state) => state,
});
