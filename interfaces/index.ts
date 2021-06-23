export interface IPost {
  title: string;
  body: string;
  id: number;
  comments?: ICommentRes[];
}

export interface IPostsAction {
  type: string;
  payload: IPost[] | IPost;
}

export interface ICommentRes {
  postId: number;
  id: number;
  body: string;
}
