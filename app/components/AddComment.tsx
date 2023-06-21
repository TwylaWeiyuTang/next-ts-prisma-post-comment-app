"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

type comments = {
  postId: string;
  comment: string;
};

const AddComment = (id?: string) => {
  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();

  let commentToastId: string;
  const { mutate } = useMutation(
    async (data: comments) => {
      return axios.post("/api/posts/addComment", { data });
    },
    {
      onError: (error) => {
        console.log("error", error);
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["detail-post"]);
        setComment("");
        setIsDisabled(false);
        toast.success("Your comment is added!", { id: commentToastId });
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastId = toast.loading("Adding your comment", {
      id: commentToastId,
    });
    setTimeout(() => toast.dismiss(commentToastId), 2000);

    mutate({ comment, postId: id });
  };
  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          name="comment"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            comment.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${comment.length}/300`}</p>
      </div>
    </form>
  );
};

export default AddComment;
