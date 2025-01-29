"use client";
import React, { useState } from "react";
import styles from "./TaskForm.module.scss";
import { Button, TextField } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircleOutline";
import SelectMenu from "../SelectMenu/SelectMenu";
import { Task, TaskList, TaskStatus } from "@/types/common";
import axios from "axios";
import { AppContext } from "@/components/Wrapper/Wrapper";
import { useForm } from "react-hook-form";

const TaskForm: React.FC<{ onCompleted: (task: Task) => void }> = ({
  onCompleted,
}) => {
  const [taskState, setTaskState] = useState({
    name: "",
    status: "" as TaskStatus,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Task>();

  const onSubmit = async (data: Task) => {
    onCompleted(taskState);
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name", {
          required: "Task name is required",
          minLength: {
            value: 3,
            message: "Task name must be at least 3 characters long",
          },
          maxLength: {
            value: 10,
            message: "Task name must be at most 10 characters long",
          },
        })}
        label="Task Name"
        placeholder="Task Name"
        id="new-task-name"
        autoFocus
        onChange={(e) => setTaskState({ ...taskState, name: e.target.value })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
      />
      <SelectMenu
        {...register("status", { required: "Task status is required" })}
        value={taskState.status}
        onChange={(val) => {
          setTaskState({ ...taskState, status: val });
          setValue("status", val);
        }}
        helperText={errors.status ? errors.status.message : ""}
        error={!!errors.status}
        testid="task-status-select"
        id="task-status-select"
      />
      <Button
        data-testid="submit-task"
        id="submit-task"
        type="submit"
        color="success"
        variant="contained"
        startIcon={<CheckCircle />}
      >
        Save
      </Button>
    </form>
  );
};

export default TaskForm;
