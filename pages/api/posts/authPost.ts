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
    return res.status(401).json({ message: "Please sign in" });
  }
  if (req.method === "GET") {
    // get Auth Users Posts
    try {
      const data = await prisma.user.findUnique({
        // get the signed in user
        where: {
          email: session.user?.email,
        },
        // get all their posts and include comments for those posts
        include: {
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              comments: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ err: "Error has occured whilst fetching posts" });
    }
  }
}
