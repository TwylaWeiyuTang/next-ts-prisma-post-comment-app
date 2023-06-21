import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import MyPost from "./MyPost";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("api/auth/signin");
  }
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome Back {session?.user?.name}</h1>
      <MyPost />
    </main>
  );
};

export default Page;
