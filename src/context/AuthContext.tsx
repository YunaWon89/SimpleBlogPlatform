import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  updateUser,
} from "../api/auth";
import type { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    username: string;
    email: string;
    password?: string;
    image?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser(token)
      .then((res) => {
        setUser(res.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

 async function login(email: string, password: string) {
  try {
    const res = await loginUser(email, password);

    localStorage.setItem("token", res.user.token);
    setUser(res.user);
  } catch (err: any) {
    console.log("LOGIN ERROR DETAILS:", err.response?.data?.errors);
    throw err;
  }
}

  async function register(
    username: string,
    email: string,
    password: string
  ) {
    const res = await registerUser({
      username,
      email,
      password,
    });

    localStorage.setItem("token", res.user.token);

    setUser(res.user);
  }

  async function updateProfile(data: {
    username: string;
    email: string;
    password?: string;
    image?: string;
  }) {
    if (!user) return;

    const res = await updateUser(user.token, data);

    setUser(res.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}