"use client";
import Image from "next/image";
import AddPost from "./components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Posts from "./components/Posts";
import { PostType } from "./types/Post";

// fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  // queryKey allows us to do caching, so when navigate among different pages it won't refetch
  // data again
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-start">
      <div className="w-full">
        <AddPost />
        {data?.map((post) => (
          <Posts
            key={post.id}
            comments={post.comments}
            name={post.author.name}
            avatar={post.author.image}
            postTitle={post.title}
            id={post.id}
          />
        ))}
      </div>
    </main>
  );
}
