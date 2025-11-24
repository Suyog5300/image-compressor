// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar"; // We will create this
import { Toaster } from "@/components/ui/sonner"; // Optional: for toast notifications

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptiFile - Ultimate Compressor",
  description: "Compress Images, PDFs, and Videos in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1 pt-16"> { /* Added pt-16 for fixed navbar */ }
                {children}
            </main>
            <Toaster /> { /* Add this line */ }
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by <span className="font-bold">OptiFile</span>. The source code is available on GitHub.
        </p>
      </div>
    </footer>
  );
}