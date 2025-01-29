"use client";
import React, { createContext, useState, ReactNode } from "react";
import { ContextType, TaskList, WrapperProps } from "@/types/common";

export const AppContext = createContext<ContextType | null>(null);

const Wrapper: React.FC<WrapperProps> = ({ children, initialTasks }) => {
  const [tasks, setTasks] = useState<TaskList>(initialTasks);

  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
};

export default Wrapper;
