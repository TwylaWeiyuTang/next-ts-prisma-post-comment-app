"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type loggedProps = {
  image: string;
};

const Logged = ({ image }: loggedProps) => {
  return (
    <li className="flex gap-8 items-center">
      <button
        onClick={() => signOut()}
        className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
      >
        {" "}
        Sign out
      </button>
      <Link href={"/dashboard"}>
        <Image width={64} height={64} src={image} alt="user profile" />
      </Link>
    </li>
  );
};

export default Logged;
