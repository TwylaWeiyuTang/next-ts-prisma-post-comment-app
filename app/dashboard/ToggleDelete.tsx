"use client";
import React from "react";

type ToggleDeleteProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

const ToggleDelete = ({ deletePost, setToggle }: ToggleDeleteProps) => {
  return (
    <div
      onClick={() => setToggle(false)}
      className="fixed bg-black/50 w-full h-full left-0 z-20 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Are you sure you want to delete this post? 😢
        </h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete button will permenantly delete your post
        </h3>
        <button
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
          onClick={deletePost}
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default ToggleDelete;
