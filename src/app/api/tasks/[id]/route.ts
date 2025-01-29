import { NextRequest, NextResponse } from "next/server";
import { getAllTasks, getTask, saveTasks } from "../route";
import { TaskStatus } from "../../../../types/common";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await req.json();

  if (!status || !Object.values(TaskStatus).includes(status)) {
    return NextResponse.json({ message: "Invalid status." }, { status: 400 });
  }

  const task = await getTask(id);
  if(!task) return NextResponse.json({ message: "Task not found." }, { status: 404 });

  const tasks = await getAllTasks();
  tasks[id].status = status;
  await saveTasks(tasks);

  const response = NextResponse.json({ id }, { status: 200 });
  return response;
}
