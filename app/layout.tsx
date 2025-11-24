import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// 1. SETUP BASE URL
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.snapfile.in";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SnapFile - Free Online Image, PDF & Video Compressor",
    template: "%s | SnapFile",
  },
  description: "Compress images, PDFs, and Videos directly in your browser. 100% private, free, and fast. Reduce file size without losing quality.",
  keywords: [
    "image compressor",
    "pdf compressor",
    "video compression",
    "reduce file size",
    "online compressor",
    "free compression tool",
    "privacy first compressor",
    "optimize jpeg",
    "shrink pdf"
  ],
  authors: [{ name: "SnapFile Team" }],
  creator: "SnapFile",
  publisher: "SnapFile",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "SnapFile - Compress Anything Instantly",
    description: "Secure, browser-based file compression. Reduce images, PDFs, and Videos by up to 80%.",
    siteName: "SnapFile",
    images: [
      {
        url: `${BASE_URL}/og-image.png`, // You need to add this image to public folder
        width: 1200,
        height: 630,
        alt: "SnapFile Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapFile - Ultimate File Compressor",
    description: "Reduce file sizes securely in your browser.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@snapfile",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${BASE_URL}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* AdSense Script */}
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}