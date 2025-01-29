import { TaskStatus } from "@/types/common";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

const SelectMenu: React.FC<{
  value: TaskStatus;
  onChange: (val: TaskStatus) => void;
  helperText?: string;
  error?: boolean;
  testid?: string;
  id?: string;
  hideInitialValue?: boolean;
}> = ({ value, onChange, helperText, error, testid, hideInitialValue, id }) => {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as TaskStatus);
  };
  return (
    <FormControl error={error}>
      <Select
        data-testid={testid}
        id={id}
        value={value}
        onChange={handleChange}
        displayEmpty
        error={error}
      >
        {!hideInitialValue && (
          <MenuItem value="">
            <em>Select Status</em>
          </MenuItem>
        )}

        {Object.values(TaskStatus).map((taskStatus) => (
          <MenuItem
            data-testid={testid ? taskStatus : ""}
            id={testid ? `new-task-${taskStatus}` : taskStatus}
            key={taskStatus}
            value={taskStatus}
          >
            {taskStatus}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText && helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectMenu;
