import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seyone.dev"),
  title: "Seyone Gunasingham | Software & Data Engineer",
  description:
    "Software and data engineer building web platforms, data pipelines, and cloud infrastructure with TypeScript, Next.js, Python, PostgreSQL, and AWS.",
  keywords: [
    "Software Engineer",
    "Data Engineer",
    "TypeScript",
    "Next.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "AWS",
    "Sri Lanka",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Seyone Gunasingham | Software & Data Engineer",
    description:
      "Software and data engineer building web platforms, data pipelines, and cloud infrastructure with TypeScript, Next.js, Python, PostgreSQL, and AWS.",
    url: "/",
    siteName: "Seyone Gunasingham",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Seyone Gunasingham | Software & Data Engineer",
    description:
      "Software and data engineer building web platforms, data pipelines, and cloud infrastructure with TypeScript, Next.js, Python, PostgreSQL, and AWS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", figtree.variable)}
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: theme init before first paint
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
