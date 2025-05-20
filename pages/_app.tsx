import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/layout"; // Assuming Layout is reusable
import "./globals.css"; // Import global styles
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}
