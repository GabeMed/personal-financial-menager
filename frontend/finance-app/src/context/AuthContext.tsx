import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authClient";
import type { User } from "@/schemas/auth";

interface AuthContext {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() =>
    authService.getCurrentUser()
  );
  const qc = useQueryClient();

  const login = (user: User, token: string) => {
    localStorage.setItem("token", token);
    setUser(user);
    qc.invalidateQueries({ queryKey: ["summary"] });
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    qc.clear();
  };

  useEffect(() => {
    if (!user && authService.isAuthenticated()) {
      setUser(authService.getCurrentUser());
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
