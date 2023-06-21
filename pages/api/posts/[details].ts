import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // get Auth Users Posts
    try {
      console.log(req.query);
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          author: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      res
        .status(403)
        .json({ err: "Error has occured whilst fetching post details" });
    }
  }
}
