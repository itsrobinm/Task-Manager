import { useContext } from "react";
import { AppContext } from "@/components/Wrapper/Wrapper";

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a Wrapper");
  }
  return context;
};

export default useAppContext;
