export interface User {
  id: string;
  login: string;
  name: string;
  username: string;
  role: "user" | "admin" | null | undefined;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  loading: boolean;
}
