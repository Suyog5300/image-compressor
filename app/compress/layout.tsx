import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | SnapFile",
  description: "Upload and compress multiple files at once. Supports JPG, PNG, PDF, and MP4 formats.",
};

export default function CompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}