import { useContext } from "react";
import UserContext from "./UserContext";

const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export default useUserContext;
