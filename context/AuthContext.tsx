"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authService } from "../service/auth.service";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "../types/user";

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("role");
        if (!token) {
          setLoading(false);
          router.push("/login");
          return;
        }

        const userData = await authService.getMe();
        setUser(userData);
      } catch (error: any) {
        if (error.response?.status === 401) {
          Cookies.remove("role");
          setUser(null);
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await authService.login(username, password);

      Cookies.set("role", data.role, {
        path: "/",
        sameSite: "Strict",
        secure: true,
      });

      Cookies.set("username", data.name, {
        path: "/",
        sameSite: "Strict",
        secure: true,
      });

      setUser(data.user);
      router.push("/");
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert("Invalid username or password");
      }
    }
  };

  const logout = () => {
    Cookies.remove("role");
    Cookies.remove("username");

    setUser(null);
    router.push("/login");
  };

  const checkAuth = async (): Promise<string | null> => {
    try {
      const token = Cookies.get("role");
      if (!token) {
        router.push("/login");
        setLoading(false);
        return null;
      }

      const userData = await authService.getMe();
      setUser(userData);
      return token;
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert("You unauthorized");
      }
      Cookies.remove("role");
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = { user, login, logout, checkAuth, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
