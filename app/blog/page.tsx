import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "SnapFile Blog - Tips for File Optimization",
  description: "Learn how to compress files, improve website speed, and manage digital documents efficiently.",
};

const articles = [
  {
    slug: "how-to-compress-pdf",
    title: "How to Compress PDF Files for Free without Uploading Data",
    excerpt: "Learn how to shrink PDF documents securely using browser-based compression. No server uploads required.",
    date: "Nov 25, 2025",
    readTime: "5 min read",
    category: "Guides"
  },
  // Add more articles here later
];

export default function BlogIndexPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Latest from the Blog</h1>
        <p className="text-muted-foreground text-lg">Tips, tutorials, and guides on digital file management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}>
            <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 w-full rounded-t-xl" />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 text-xs mt-2">
                    <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3"/> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {article.readTime}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}