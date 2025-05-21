import { Container } from "@/components/container";
import Dashboard from "@/components/dashboard";
import AddTaskTable from "@/components/addTaskTable";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";

export default function Home() {
  const { user } = useAuth();
  const role = user?.role;
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
        <Dashboard role={role || null} />
      </div>
      <div>
        <AddTaskTable />
      </div>
    </Container>
  );
}
