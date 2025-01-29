import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { TaskList, TaskStatus } from "@/types/common";
import { Task } from "@/types/common";

export async function GET(req: NextRequest) {
  const tasks = await getAllTasks();

  const response = NextResponse.json(tasks, { status: 200 });
  return response;
}

export async function POST(req: NextRequest) {
  const { name, status } = await req.json();
  const taskId = await generateUUID();
  const newTask = { name, status };

  const tasks = await getAllTasks();
  tasks[taskId] = newTask;

  await saveTasks(tasks);

  const response = NextResponse.json(
    { taskId },
    { status: 201 }
  );
  return response;
}

export async function getTask(taskId: string): Promise<Task> {
  const filePath = path.join(process.cwd(), "/public/tasks.json");

  const file = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(file);
  return data[taskId];
}

export async function getAllTasks(): Promise<TaskList> {
  const filePath = path.join(process.cwd(), "/public/tasks.json");
  const file = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(file);
  return data;
}

async function generateUUID(): Promise<string> {
  let id;
  let found = true;

  while (found) {
    console.log("generating id");
    id = Math.random().toString(16).substring(2, 7); //allows for up to 1048576 unique ids

    let returnedTask = await getTask(id);

    if (!returnedTask) {
      found = false;
    }
  }

  return id!;
}

export async function saveTasks(tasks: TaskList) {
  const filePath = path.join(process.cwd(), "/public/tasks.json");
  await fs.writeFile(filePath, JSON.stringify(tasks));
}
