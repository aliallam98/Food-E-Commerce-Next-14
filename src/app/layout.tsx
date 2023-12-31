import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AppProvider from "@/components/AppProvider";
import { EdgeStoreProvider } from "@/libs/edgestore";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:"Pizza"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <ReduxProvider>
          <EdgeStoreProvider>
            <Toaster />
            <Navbar />
            {children}
          </EdgeStoreProvider>
          </ReduxProvider>
        </AppProvider>
      </body>
    </html>
  );
}
