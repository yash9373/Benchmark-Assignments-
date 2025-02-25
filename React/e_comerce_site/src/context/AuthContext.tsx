import { createContext, ReactNode, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  userName: string;
  role: "admin" | "user";
  token: string;
  cart?: any[]; // Fixed cart type
}

interface AuthState {
  user: User | null;
}

type ContextType = {
  state: AuthState;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
  addToCart: (product: any) => void;
};

type AuthAction = { type: "logIn"; payload: User } | { type: "logOut" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "logIn":
      return { user: action.payload };
    case "logOut":
      return { user: null };
    default:
      return state;
  }
};

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const navigate = useNavigate();

  const logIn = async (username: string, password: string) => {
    let role: "admin" | "user" = "user";
    if (username === "admin" && password === "admin") {
      role = "admin";
      const userData: User = { userName: username, role, token: "", cart: [] };
      dispatch({ type: "logIn", payload: userData });
      navigate("/AdminDashBoard");
    } else {
      try {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          alert("Invalid credentials");
          return;
        }

        const data = await response.json();
        const userData: User = {
          userName: username,
          role,
          token: data.token,
          cart: [],
        };
        dispatch({ type: "logIn", payload: userData });
        navigate("/Dashboard");
      } catch (err) {
        console.error("Login Failed, please try again");
        alert("Login Failed, please try again");
      }
    }
  };

  const logOut = () => {
    dispatch({ type: "logOut" });
    navigate("/");
  };

  const addToCart = (product: any) => {
    const user = state.user;

    if (!user) return;

    const updatedCart = user.cart ? [...user.cart, product] : [product];

    const updatedUser = { ...user, cart: updatedCart };
    dispatch({ type: "logIn", payload: updatedUser });
  };

  return (
    <AuthContext.Provider value={{ state, logIn, logOut, addToCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
