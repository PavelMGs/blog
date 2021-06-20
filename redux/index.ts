import { combineReducers } from "redux";
import { postsReducer } from "./reducers/posts";

export const rootReducer = combineReducers({
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
