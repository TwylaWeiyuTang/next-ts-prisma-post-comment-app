"use client";
import Image from "next/image";
import AddPost from "./components/AddPost";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start">
      <div className="w-full">
        <h1 className="text-xl py-5 ">Hello</h1>
        <AddPost />
      </div>
    </main>
  );
}
