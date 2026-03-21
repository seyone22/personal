import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seyone Gunasingham | Android & AI Developer",
  description: "Portfolio of Seyone Gunasingham, specializing in Android ecosystems, enterprise logistics, and AI-driven solutions.",
  keywords: ["Android Developer", "Kotlin", "Next.js", "AI Engineering", "Sri Lanka"],
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={cn("dark", "font-sans", figtree.variable)} style={{ colorScheme: 'dark' }}>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}>
      {/* You can add a shared Navbar v component here later */}
      {children}
      </body>
      </html>
  );
}