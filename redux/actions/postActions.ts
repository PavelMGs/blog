import { IPost } from "../../interfaces";
import { POST, POSTS } from "./actionsNames";

export const postsAction = (payload: IPost[]) => ({
  type: POSTS,
  payload,
});

export const postAction = (payload: IPost) => ({
  type: POST,
  payload,
});
