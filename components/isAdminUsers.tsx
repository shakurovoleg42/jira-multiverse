"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const IsAdminUsers = ({ role }: { role: string }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <li>
      {role === "admin" && (
        <Link href="/users" className="hover:border-b-[3px] border-amber-500">
          Users
        </Link>
      )}
    </li>
  );
};

export default IsAdminUsers;
