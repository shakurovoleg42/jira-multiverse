import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Container } from "@/components/Container";
import Dashboard from "@/components/dashboard";
import AddTaskTable from "@/components/addTaskTable";
import { taskService } from "@/service/task.service";
import { Task } from "@/types/tasks";
import { User } from "@/types/user";

interface HomePageProps {
  initialTasks: Task[];
  role: User["role"] | null;
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const cookies = parseCookies(context);
  const role = (cookies.role as User["role"]) || null;

  try {
    const cookieHeader = context.req.headers.cookie || "";
    const initialTasks = await taskService.list(cookieHeader);

    return {
      props: {
        initialTasks,
        role,
      },
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      props: {
        initialTasks: [],
        role,
      },
    };
  }
};

export default function Home({ initialTasks, role }: HomePageProps) {
  if (!role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video src="/anim.webm" autoPlay loop muted />
      </div>
    );
  }

  return (
    <Container className="relative my-20 flex flex-col md:flex-row justify-center gap-[100px] align-top">
      <div>
        <Dashboard initialTasks={initialTasks} role={role} />
      </div>
      <div>
        <AddTaskTable />
      </div>
    </Container>
  );
}
