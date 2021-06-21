import { combineReducers } from "redux";
import { IPost } from "../interfaces";
import { postsReducer } from "./reducers/posts";

export const rootReducer = combineReducers({
  posts: postsReducer,
});

export type RootState = {
  posts: IPost[];
};
