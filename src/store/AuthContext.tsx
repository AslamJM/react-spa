import { initAuth, refreshAccessToken } from "@/api/auth";
import { User } from "@/types/user";
import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: { user: AuthState["user"]; token: string } }
  | { type: "REFRESH"; payload: { token: string } }
  | { type: "LOGOUT" };

// Define the shape of the context
interface AuthContextProps {
  state: AuthState;
  login: (user: AuthState["user"], token: string) => Promise<void>;
  refreshToken: (token: string) => Promise<void>;
  logout: () => void;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Create context
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

// Reducer function to update the state based on action type
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case "REFRESH":
      return { ...state, token: action.payload.token };

    default:
      return state;
  }
};

// Provider component that wraps your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (user: AuthState["user"], token: string) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const refreshToken = async () => {
    const token = await refreshAccessToken();
    dispatch({ type: "REFRESH", payload: { token } });
  };

  const initializeAuth = useCallback(async () => {
    try {
      const { access_token, user } = await initAuth();
      login(user, access_token);
    } catch (error) {
      console.error("Failed to initialize authentication:", error);
      logout();
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider value={{ state, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
