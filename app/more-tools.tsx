/* eslint-disable @typescript-eslint/no-explicit-any */
// components/more-tools.tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileVideo, ImageIcon } from "lucide-react";

export function MoreTools() {
  return (
    <section className="py-12 border-t mt-12">
      <h3 className="text-2xl font-bold text-center mb-8">More Compression Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ToolCard href="/compress/image" title="Compress Images" icon={<ImageIcon />} />
        <ToolCard href="/compress/pdf" title="Compress PDF" icon={<FileText />} />
        <ToolCard href="/compress/video" title="Compress Video" icon={<FileVideo />} />
      </div>
    </section>
  )
}

function ToolCard({ href, title, icon }: any) {
  return (
    <Link href={href}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
          <span className="font-semibold">{title}</span>
        </CardContent>
      </Card>
    </Link>
  )
}