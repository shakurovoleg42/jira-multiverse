export interface User {
  id: string;
  login: string;
  name: string;
  username: string;
  role: "user" | "admin" | null | undefined;
}
