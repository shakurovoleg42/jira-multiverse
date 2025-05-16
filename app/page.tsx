// import Image from "next/image";

import { Container } from "@/components/container";
import Dashboard from "@/components/dashboard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Container className="flex flex-col 2xl:flex-row mt-20">
      <div>
        <Button className="">Add Tasks</Button>
      </div>
      <div>
        <Dashboard />
      </div>
    </Container>
  );
}
