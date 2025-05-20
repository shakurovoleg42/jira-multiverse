"use client";
import { Container } from "@/components/container";
import React, { useEffect, useState } from "react";
import { authService } from "./service/auth.service";
import { useRouter } from "next/navigation";

function Users() {
  const [access, setAccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        await authService.getMe();

        const role = localStorage.getItem("role")?.replace(/"/g, "");

        switch (role) {
          case "admin":
          case "user":
            setAccess(role);
            break;
          default:
            setAccess(null);
            router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {access === "admin" ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Access</h1>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">You have no permission</h1>
        </div>
      )}
    </Container>
  );
}

export default Users;
