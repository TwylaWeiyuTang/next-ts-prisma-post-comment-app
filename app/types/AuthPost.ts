export type PostType = {
  email: string;
  id: string;
  image: string;
  name: string;
  posts: {
    createdAt: string;
    id: string;
    title: string;
    comments?: {
      createdAt: string;
      id: string;
      postId: string;
      userId: string;
    }[];
  }[];
};
