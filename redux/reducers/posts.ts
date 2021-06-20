import { IPost, IPostsAction } from "../../interfaces";
import { POSTS } from "../actions/actionsNames";

export const postsReducer = (
  state: IPost[] | [] = [],
  action: IPostsAction
) => {
  switch (action.type) {
    case POSTS: {
      return action.payload;
      break;
    }

    default: {
      return state;
    }
  }
};
