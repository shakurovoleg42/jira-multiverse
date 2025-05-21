import { FC, PropsWithChildren } from "react";

import Header from "./header";
import Footer from "./footer";
import { useAuth } from "@/context/AuthContext";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <>
      <Header role={role ?? null} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
