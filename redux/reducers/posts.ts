import { IPost, IPostAction, IPostsAction } from "../../interfaces";
import { POST, POSTS } from "../actions/actionsNames";

export const postsReducer = (
  state: IPost[] | [] = [],
  action: IPostsAction | IPostAction
) => {
  switch (action.type) {
    case POSTS: {
      return action.payload;
    }

    case POST: {
      return [...state, action.payload];
    }

    default: {
      return state;
    }
  }
};
