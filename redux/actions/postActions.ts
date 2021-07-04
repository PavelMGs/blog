import { IPost, IPostsAction } from "../../interfaces";
import { POST, POSTS } from "./actionsNames";

export const postsAction = (payload: IPost[]): IPostsAction => ({
  type: POSTS,
  payload,
});

export const postAction = (payload: IPost): IPostsAction => ({
  type: POST,
  payload,
});
