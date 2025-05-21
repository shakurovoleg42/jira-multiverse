"use client";
import { Container } from "@/components/container";
import React, { useEffect, useState } from "react";
import { authService } from "../service/auth.service";
import { useRouter } from "next/navigation";
import { usersService } from "@/service/users.service";

function Users() {
  const [access, setAccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
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
        const users = await usersService.list();
        setUsers(users);
        console.log(users);
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
                {users.map((user: any) => (
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
        <div className="text-center">
          <h1 className="text-2xl font-bold">You have no permission</h1>
        </div>
      )}
    </Container>
  );
}

export default Users;
