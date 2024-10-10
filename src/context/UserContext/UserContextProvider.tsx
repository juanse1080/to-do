import { PropsWithChildren, useState } from "react";
import { User } from "../../types";
import UserContext from "./UserContext";

export type UserContextProviderProps = {} & PropsWithChildren;

const UserContextProvider = ({
  children,
}: Readonly<UserContextProviderProps>) => {
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") ?? "{}")
    : undefined;

  const [user, setUser] = useState<User | undefined>(currentUser);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
