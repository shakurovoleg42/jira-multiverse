"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      router.push("/");
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="relative border border-amber-500/30 shadow-lg shadow-amber-600/40 rounded-2xl px-8 pt-10 pb-8 w-full max-w-md bg-gray-800/50 backdrop-blur-sm overflow-hidden">
        <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-600"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-600"></div>

        <h2 className="text-3xl font-bold mb-8 text-center text-amber-500">
          Welcome Back
          <span className="block text-sm font-normal mt-2 text-gray-300">
            Please enter your details
          </span>
        </h2>

        <div className="space-y-6 text-[#ff4747] font-bold">
          {error && <p>Login or password in incorrect</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="py-5 px-4 bg-gray-700/50 border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-gray-400 transition-all"
                required
              />
            </div>
            <div>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-5 px-4 bg-gray-700/50 border-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-gray-400 transition-all"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.01] shadow-md shadow-amber-600/30"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
