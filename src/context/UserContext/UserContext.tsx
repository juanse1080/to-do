import { createContext } from "react";
import { User } from "../../types";

export type UserContextValue = {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export default UserContext;
