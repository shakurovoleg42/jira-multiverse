"use client";
import { Container } from "@/components/container";
import Dashboard from "@/components/dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddTaskTable from "@/components/addTaskTable";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    if (!storedRole) {
      router.push("/login");
    }
  }, [router]);

  if (!role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video src="/anim.webm" autoPlay loop muted></video>
      </div>
    );
  }

  return (
    <Container className="relative my-20 flex flex-col md:flex-row  justify-between">
      <div>
        <Dashboard />
      </div>
      <div>
        <AddTaskTable />
      </div>
    </Container>
  );
}
