import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "../components/layout";
import "./globals.css";
import type { AppProps } from "next/app";
import NextTopLoader from "nextjs-toploader";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader color="#FFD700" height={2} showSpinner={false} />

      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}
