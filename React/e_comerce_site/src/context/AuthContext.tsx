import {
  createContext,
  ReactNode,
  useReducer,
  useState,
  useContext,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AdminDashBoard } from "../pages/adminDashBoard";
interface User {
  userName: string;
  role: "admin" | "user";
  token: string;
}

interface authState {
  user: User | null;
}

type contextType = {
  state: authState;
  logIn: (username: string, password: string) => Promise<void>; //return type is promise because we are using async function
  logOut: () => void;
};

type authAction = { type: "logIn"; payload: User } | { type: "logOut" };

const authReducer = (state: authState, action: authAction): authState => {
  switch (action.type) {
    case "logIn":
      return { user: action.payload };
    case "logOut":
      return { user: null };
    default:
      return state;
  }
};
const authcontext = createContext<contextType | undefined>(undefined); // |undefined beacuse we are not providing any value to the context yet

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const Navigate = useNavigate();

  const logIn = async (username: string, password: string) => {
    let role: "admin" | "user" = "user";
    if (username === "admin" && password === "admin") {
      role = "admin";
      const userData: User = { userName: username, role, token: "" };
      dispatch({ type: "logIn", payload: userData });
      Navigate("/AdminDashBoard");
    } else {
      try {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        console.log(response);
        if (!response.ok) throw new Error("Invalid credentials");
        const data = await response.json();

        const userData: User = { userName: username, role, token: data.token };
        dispatch({ type: "logIn", payload: userData });
        Navigate("/Dashboard");
      } catch (err) {
        throw new Error("Login Failed Please try again");
        alert("Login Failed Please try again");
      }
    }
  };
  const logOut = () => {
    dispatch({ type: "logOut" });
    Navigate("/");
  };

  return (
    <authcontext.Provider value={{ state, logIn, logOut }}>
      {children}
    </authcontext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(authcontext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
