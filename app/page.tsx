"use client";
import { Container } from "@/components/container";
import Dashboard from "@/components/dashboard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const role = localStorage.getItem("role");
  if (!role) {
    window.location.href = "/login";
  }

  return (
    <Container className="relative mt-20">
      {role && (
        <>
          <Button className="xl:fixed xl:top-[230px] xl:right-4 xl:z-50">
            Add Tasks
          </Button>
          <div className="pt-4">
            <Dashboard />
          </div>
        </>
      )}
    </Container>
  );
}
