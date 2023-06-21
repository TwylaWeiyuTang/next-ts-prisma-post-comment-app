import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check if user is logged in
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." });
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (req.method === "POST") {
    const { postId, comment } = req.body.data;

    if (!comment.length) {
      return res
        .status(401)
        .json({ message: "please do not leave this empty!" });
    }

    try {
      const result = await prisma.comments.create({
        data: {
          message: comment,
          userId: prismaUser?.id,
          postId: postId.id,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while deleting a post" });
    }
  }
}
