import React from "react";
import { TaskArrayItem } from "@/types/common";
import styles from "./TaskItem.module.scss";
import axios from "axios";
import SelectMenu from "@/components/SelectMenu/SelectMenu";
import useAppContext from "@/hooks/useAppContext";
import { createDeepCopy } from "@/utils/utils";

const TaskItem: React.FC<TaskArrayItem> = ({ id, name, status, hideInitialValue }) => {
  const { tasks, setTasks } = useAppContext();

  return (
    <div className={styles.taskItem}>
      <h2>{name}</h2>
      <b>Status:</b>
      <SelectMenu
        value={status}
        hideInitialValue={hideInitialValue}
        onChange={async (status) => {
          const updatedTasks = createDeepCopy(tasks); // create a deep copy of the tasks object
          updatedTasks[id].status = status;
          setTasks(updatedTasks);
          await axios.put(`/api/tasks/${id}`, { status });
        }}
      />
    </div>
  );
};

export default TaskItem;
