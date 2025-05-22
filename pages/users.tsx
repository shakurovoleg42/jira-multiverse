import { Container } from "@/components/container";
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

  if (!role || (role !== "admin" && role !== "user")) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
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
      {role === "admin" ? (
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
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">You have no permission</h1>
        </div>
      )}
    </Container>
  );
}
