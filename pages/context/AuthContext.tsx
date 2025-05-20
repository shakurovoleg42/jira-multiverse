"use client";
import { createContext, useContext, useEffect, useState } from "react";
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
        const token = localStorage.getItem("role");
        if (!token) {
          router.push("/login");
          setLoading(false);
          return;
        }

        const userData = await authService.getMe();
        setUser(userData);
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("role");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await authService.login(username, password);
      localStorage.setItem("username", JSON.stringify(data.name));
      localStorage.setItem("role", JSON.stringify(data.role));
      setUser(data.user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    router.push("/login");
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("role");
      if (!token) {
        router.push("/login");
        setLoading(false);
        return;
      }

      const userData = await authService.getMe();
      console.log(userData);
      setUser(userData);
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("role");
      setUser(null);
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
