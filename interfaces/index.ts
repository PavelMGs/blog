export interface IPost {
  title: string;
  body: string;
  id: number;
  comments?: ICommentRes[];
}

export interface IPostsAction {
  type: string;
  payload: IPost[];
}

export interface IPostAction {
  type: string;
  payload: IPost;
}

export interface ICommentRes {
  postId: number;
  id: number;
  body: string;
}
