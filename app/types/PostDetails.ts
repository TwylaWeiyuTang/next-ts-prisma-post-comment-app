export type PostDetailType = {
  title: string;
  id: string;
  updatedAt?: string;
  author: {
    id: string;
    email: string;
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    authorId: string;
    title: string;
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
  }[];
};
