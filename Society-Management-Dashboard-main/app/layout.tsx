import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import Navebar from "@/components/Navebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMS",
  description: "Society Management System",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex" suppressHydrationWarning>

        <ThemeProvider
          attribute="class"
          defaultTheme="Light"
          enableSystem
          disableTransitionOnChange
        >
          
          {children}
          <Toaster/>
        </ThemeProvider>

      </body>
    </html>
  );
}
