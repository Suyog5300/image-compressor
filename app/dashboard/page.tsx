import { Metadata } from "next";
import Link from "next/link";
import { 
  Image as ImageIcon, 
  FileText, 
  FileVideo, 
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Free File Compression & Conversion Tools | SnapFile",
  description:
    "Compress images, PDFs, and videos online for free. Convert between file formats instantly. Privacy-first browser-based processing - your files never leave your device.",
  keywords: [
    "file compressor",
    "image compression",
    "pdf compressor",
    "video compressor",
    "file converter",
    "online compression tool",
    "free file compression",
    "reduce file size",
  ],
};

const compressionTools = [
  {
    title: "Image Compressor",
    description: "Reduce JPG, PNG, and WebP file sizes by up to 90% without visible quality loss.",
    icon: ImageIcon,
    href: "/compress/image",
    color: "blue",
    stats: { reduction: "90%", formats: "JPG, PNG, WebP, GIF" },
  },
  {
    title: "PDF Compressor",
    description: "Shrink PDF documents for email attachments and storage optimization.",
    icon: FileText,
    href: "/compress/pdf",
    color: "red",
    stats: { reduction: "80%", formats: "PDF" },
  },
  {
    title: "Video Compressor",
    description: "Optimize MP4 and video files while preserving visual quality.",
    icon: FileVideo,
    href: "/compress/video",
    color: "purple",
    stats: { reduction: "70%", formats: "MP4, WebM, MOV" },
  },
];

const conversionTools = [
  {
    title: "Image Converter",
    description: "Convert between PNG, JPG, WebP, GIF, and other image formats.",
    icon: RefreshCw,
    href: "/convert/image",
    color: "purple",
    conversions: ["PNG → JPG", "JPG → WebP", "WebP → PNG", "Any → Any"],
  },
  {
    title: "PDF Converter",
    description: "Convert PDFs to images or merge images into PDF documents.",
    icon: FileText,
    href: "/convert/pdf",
    color: "orange",
    conversions: ["PDF → Image", "Image → PDF", "Merge PDFs"],
  },
];

export default function CompressPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          <Badge variant="outline" className="mb-6">
            All Tools
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Compress & Convert Files{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              Privately
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Reduce file sizes and convert formats directly in your browser. Your files never leave
            your device—100% private, 100% free.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>No Server Uploads</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>Works Offline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Compression Tools */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10">
            <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              <Zap className="w-3 h-3 mr-1" /> Compression
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Reduce File Sizes</h2>
            <p className="text-muted-foreground">
              Compress images, documents, and videos without losing quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {compressionTools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="group h-full hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border-border/50 hover:border-blue-500/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                        tool.color === "blue"
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                          : tool.color === "red"
                          ? "bg-gradient-to-br from-red-500 to-orange-500"
                          : "bg-gradient-to-br from-purple-500 to-pink-500"
                      } text-white`}
                    >
                      <tool.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="secondary">Up to {tool.stats.reduction} smaller</Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Tools */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10">
            <Badge className="mb-3 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              <RefreshCw className="w-3 h-3 mr-1" /> Conversion
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Convert Formats</h2>
            <p className="text-muted-foreground">
              Transform files between different formats instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {conversionTools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border/50 hover:border-purple-500/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                        tool.color === "purple"
                          ? "bg-gradient-to-br from-purple-500 to-pink-500"
                          : "bg-gradient-to-br from-orange-500 to-red-500"
                      } text-white`}
                    >
                      <tool.icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {tool.conversions.map((conv) => (
                        <Badge key={conv} variant="secondary" className="text-xs">
                          {conv}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-center mb-8">Why Use SnapFile?</h2>
            
            <p>
              SnapFile is a collection of free file optimization tools designed with privacy as the
              top priority. Unlike traditional online compressors that upload your files to remote
              servers, every SnapFile tool processes your files directly in your web browser using
              WebAssembly technology.
            </p>

            <h3>Complete Privacy by Design</h3>
            <p>
              When you use SnapFile, your files never leave your device. The compression and
              conversion algorithms run locally in your browser, using your computer's processing
              power. This means sensitive documents, personal photos, and private videos remain
              completely private—there's no server to hack, no database to breach, and no data to
              sell.
            </p>

            <h3>Professional-Grade Compression</h3>
            <p>
              We use industry-standard libraries compiled to WebAssembly, including components from
              FFmpeg for video processing and advanced image optimization algorithms. The results
              are comparable to desktop software like Adobe Acrobat or HandBrake, but accessible
              directly from your browser.
            </p>

            <h3>No Installation Required</h3>
            <p>
              SnapFile works in any modern web browser—Chrome, Firefox, Safari, or Edge—on Windows,
              Mac, Linux, or ChromeOS. There's nothing to download, no software to keep updated, and
              no risk of malware from executable downloads.
            </p>

            <h3>Completely Free</h3>
            <p>
              Our Free tier provides full access to all compression and conversion tools with
              reasonable limits. For power users who need larger files or batch processing, we offer
              affordable Pro plans—but the core functionality is and will remain free.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Optimize Your Files?</h2>
          <p className="text-lg text-blue-100 mb-6">
            Start compressing and converting—free, fast, and completely private.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-white text-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/compress/image">
                Compress Images <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/convert/image">Convert Files</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}