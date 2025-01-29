"use client";
import React from "react";
import { TaskStatus } from "@/types/common";
import TaskItem from "@/components/TaskItem/TaskItem";
import styles from "./TaskList.module.scss";
import { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import TaskForm from "../TaskForm/TaskForm";
import axios from "axios";
import useAppContext from "@/hooks/useAppContext";
import { createDeepCopy } from "@/utils/utils";

const TaskList: React.FC<{ status: TaskStatus; addTaskButton?: boolean }> = ({
  status,
  addTaskButton,
}) => {
  const { tasks, setTasks } = useAppContext();

  const [toggleAddTask, setToggleAddTask] = useState(false);
  return (
    <div className={styles.colHeading}>
      <h1>{status}</h1>
      {Object.entries(tasks)
        .map(([id, task]) => ({
          id,
          ...task,
        }))
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskItem key={task.id} {...task} hideInitialValue />
        ))}

      {toggleAddTask && (
        <TaskForm
          onCompleted={async (task) => {
            const res = await axios.post(`/api/tasks`, task);

            if (res.data) {
              const updatedTasks = createDeepCopy(tasks); // create a deep copy of the tasks object
              updatedTasks[res.data.taskId] = task;
              setTasks(updatedTasks);
              setToggleAddTask(false);
            }
          }}
        />
      )}

      {addTaskButton && (
        <Button
          id="add-task-btn"
          disabled={toggleAddTask}
          onClick={() => {
            setToggleAddTask(true);
          }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
      )}
    </div>
  );
};

export default TaskList;
