//"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import axios from "axios";
import { TaskArray, TaskList, TaskStatus } from "@/types/common";
import TaskItem from "@/components/TaskItem/TaskItem";
import TaskListComponent from "@/components/TaskList/TaskList";
import Wrapper from "@/components/Wrapper/Wrapper";

async function fetchTasks(): Promise<TaskList> {
  const response = await axios.get<TaskList>("http://localhost:3000/api/tasks");
  return response.data;
}

export default async function Home() {
  const tasks = await fetchTasks();

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Wrapper initialTasks={tasks}>
          <TaskListComponent status={TaskStatus.INCOMPLETE} addTaskButton />
          <TaskListComponent status={TaskStatus.IN_PROGRESS} />
          <TaskListComponent status={TaskStatus.COMPLETED} />
        </Wrapper>
      </div>
    </div>
  );
}
