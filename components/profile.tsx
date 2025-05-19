/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/app/service/auth.service";
import { useRouter } from "next/navigation";

function Profile() {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const updateProfile = () => {
      setUsername(localStorage.getItem("username"));
      setRole(localStorage.getItem("role"));
    };

    updateProfile();
    window.addEventListener("storage", updateProfile);

    return () => window.removeEventListener("storage", updateProfile);
  }, []);

  const cleanName = username ? username.replace(/"/g, "") : null;
  const cleanRole = role ? role.replace(/"/g, "") : null;

  return (
    <div className="flex items-center space-x-2 p-6">
      <img
        src="https://avatars.githubusercontent.com/u/121859456?v=4"
        className="w-8 h-8 rounded-full"
        alt="Profile"
      />
      <span className="text-sm font-bold">{cleanName || "Guest"}</span>
      {cleanRole && (
        <>
          <span>-</span>
          <span>{cleanRole}</span>
        </>
      )}
    </div>
  );
}

function ProfileMenu() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      setRole(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return role ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Profile />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
          {isLoading ? "Exiting..." : "Exit"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href="/login" className="p-6 text-sm font-bold hover:underline">
      Login
    </Link>
  );
}

export default ProfileMenu;
