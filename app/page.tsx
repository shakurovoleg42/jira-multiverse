"use client";
import { Container } from "@/components/container";
import Dashboard from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    return null;
  }

  return (
    <Container className="relative mt-20">
      <Button className=" liefixed xl:top-[230px] xl:right-4 xl:z-50">
        Add Tasks
      </Button>
      <div className="pt-4">
        <Dashboard />
      </div>
    </Container>
  );
}
