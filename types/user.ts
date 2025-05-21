export interface User {
  id: string;
  username: string;
  role: "user" | "admin" | null;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  loading: boolean;
}
