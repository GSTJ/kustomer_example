import { createContext } from "react";

interface ContextProps {
  orgId: string;
}

export default createContext<ContextProps>({
  orgId: "",
});
