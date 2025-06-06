import { Container } from "@/components/Container";
import { usersService } from "@/service/users.service";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { User } from "@/types/user";

interface UsersPageProps {
  role: string | null;
  users: User[];
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async (
  context
) => {
  const cookies = parseCookies(context);
  const role = cookies.role || null;

  if (role !== "admin") {
    return {
      redirect: {
        destination: "/404",
        permanent: true,
      },
    };
  }
  if (!role) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  try {
    const cookieHeader = context.req.headers.cookie || "";
    const users = await usersService.list(cookieHeader);
    return {
      props: {
        role,
        users,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      notFound: true,
    };
  }
};

export default function Users({ role, users }: UsersPageProps) {
  return (
    <Container>
      <div className="text-center flex flex-col items-center my-5">
        <h1 className="text-2xl font-bold">Admin Access</h1>
        <div>
          <table className="table-auto w-full my-3">
            <thead>
              <tr>
                <th className="px-4 py-2 border-2">Login</th>
                <th className="px-4 py-2 border-2">Role</th>
                <th className="px-4 py-2 border-2">Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-2">{user.login}</td>
                  <td className="px-4 py-2 border-2">{user.role}</td>
                  <td className="px-4 py-2 border-2">{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
