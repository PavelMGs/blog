import { IPost } from "../../interfaces";
import { POSTS } from "./actionsNames";

export const postsAction = (payload: IPost[]) => ({
  type: POSTS,
  payload,
});
