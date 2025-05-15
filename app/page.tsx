// import Image from "next/image";

import { Container } from "@/components/container";
import Dashboard from "@/components/dashboard";

export default function Home() {
  return (
    <Container className="flex flex-col mt-20">
      <div>add task</div>
      <div>
        <Dashboard />
      </div>
    </Container>
  );
}
