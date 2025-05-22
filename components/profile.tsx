"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { authService } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { DoorOpen } from "lucide-react";
import { Button } from "./ui/button";

function ProfileMenu({ role }: { role: string | null }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.01] shadow-md shadow-amber-600/30"
      onClick={() => handleLogout()}
      disabled={!role || isLoading}
    >
      {role ? (
        <Link
          href="/login"
          className="p-6 text-sm font-bold hover:underline flex flex-row items-center gap-1"
        >
          <b>Logout</b>
          <DoorOpen />
        </Link>
      ) : (
        <Link href="/login" className="p-6 text-sm font-bold hover:underline">
          Login
        </Link>
      )}
    </Button>
  );
}

export default ProfileMenu;
