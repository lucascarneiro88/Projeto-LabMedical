import { useContext } from "react";
import { AppContext } from "./AppProvider";

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
  }