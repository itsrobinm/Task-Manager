import { ReactNode } from "react";

export interface TaskList extends Record<string, Task> {}
export interface TaskArrayItem extends Task {
  id: string;
  hideInitialValue?: boolean;
}

export interface Task {
  name: string;
  status: TaskStatus;
}

export interface TaskArray extends Array<TaskArrayItem> {}

export enum TaskStatus {
  INCOMPLETE = "Incomplete",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface WrapperProps {
  children: ReactNode;
  initialTasks: TaskList;
}

export interface ContextType {
  tasks: TaskList;
  setTasks: React.Dispatch<React.SetStateAction<TaskList>>;
}
