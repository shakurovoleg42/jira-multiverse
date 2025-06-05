"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/service/auth.service";
import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";

export default function ProfileMenu({
  initialRole,
}: {
  initialRole: string | null;
}) {
  const [role, setRole] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    setRole(initialRole);
  }, [initialRole]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      router.push("/login");
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  if (role === null) {
    return (
      <a
        href="/login"
        className="bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg shadow-md shadow-amber-600/30 py-2 px-4"
      >
        Login
      </a>
    );
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      className="bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg flex items-center gap-1 shadow-md shadow-amber-600/30 px-4 py-2"
    >
      Logout <DoorOpen size={18} />
    </Button>
  );
}
