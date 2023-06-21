"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { PostType } from "../types/AuthPost";
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPost");
  return response.data;
};

const MyPost = () => {
  const { data, isLoading } = useQuery<PostType>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading) return <h1>Posts are loading...</h1>;
  if (data) console.log(data);
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default MyPost;
