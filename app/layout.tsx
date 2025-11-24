import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar"; 
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script"; // <--- Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnapFile - Compress Anything",
  description: "Secure, fast, and free file compression tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID_HERE" // <--- REPLACE THIS
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer /> {/* We will create this footer below */}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Simple Footer Component for links
function Footer() {
    return (
        <footer className="border-t py-8 bg-muted/20 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                    © 2024 SnapFile. All rights reserved.
                </div>
                <nav className="flex gap-6 text-sm font-medium">
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                    <a href="/terms" className="hover:underline">Terms</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                </nav>
            </div>
        </footer>
    )
}