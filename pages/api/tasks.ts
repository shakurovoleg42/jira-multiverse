import { NextApiRequest, NextApiResponse } from "next";
import { taskService } from "../../service/task.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tasks = await taskService.list();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(401).json({ error: "Not Authenticated" });
  }
}
