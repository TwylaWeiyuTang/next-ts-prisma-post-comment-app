"use client";

import AddComment from "@/app/components/AddComment";
import Posts from "@/app/components/Posts";
import { PostType } from "@/app/types/Post";
import { PostDetailType } from "@/app/types/PostDetails";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading } = useQuery<PostDetailType[]>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <div>
      <Posts
        id={data.id}
        name={data.author.name}
        avatar={data.author.image}
        postTitle={data.title}
        comments={data.comments}
      />
      <AddComment id={data.id} />
      {data?.comments?.map((com) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          className="my-6 bg-white p-8 rounded-md"
          key={com.id}
        >
          <div className="flex items-center gap-2">
            <Image width={24} height={24} src={com.user?.image} alt="avatar" />
            <h3 className="font-bold">{com?.user?.name}</h3>
            <h2 className="text-sm">{com.createdAt}</h2>
          </div>
          <div className="py-4">{com.message}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostDetail;
