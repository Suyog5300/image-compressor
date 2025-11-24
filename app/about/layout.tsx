import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SnapFile",
  description: "Learn how SnapFile uses WebAssembly to compress files locally without server uploads.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}